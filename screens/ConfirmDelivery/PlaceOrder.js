import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
// import { getTokens } from "../../utls";
import { connect } from "react-redux";
import axios from "axios";
// import { URL } from "../../utls";
import Constants from "expo-constants";
import OrderSummary from "../../components/OrderSummary";
import { Button, withTheme } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
// import { placeOrder, empty } from "../../store/actions";
class PlaceOrder extends React.Component {
  state = {
    userID: "",
    loading: false,
    data: [],
  };

  componentDidMount() {
    // getTokens((val) => {
    //   if (val[0][1] === null) {
    //     this.setState({ loading: false });
    //   } else {
    //     this.setState({ userID: val[0][1], loading: false });
    this.getData();
    //   }
    // });
  }

  getData = () => {
    const data = {};
    const quantities = this.getQuantityCount();
    data.userID = this.props.user.id;
    data.products_id = this.getProductsID();
    data.quantities = this.getQuantityCount();
    data.total_quantity = this.getTotalQuantity(quantities);
    data.total_price = this.calPrice();
    //   data.amountAfterDiscount = this.calPrice();
    data.shippingID = this.props.defaultAddress[0].id;
    data.orderStatus = 0;
    //   data.totalShippingCharges = this.calPrice() + 20;
    this.setState({
      data: data,
    });
  };
  getProductsID = () => {
    return this.props.cartItems.map((element) => element);
  };
  getQuantityCount = () => {
    return this.props.cartItems.map((element) => element.units);
  };

  postData = (data) => {
    console.log(data);
    //   this.props
    //     .dispatch(placeOrder(data))
    //     .then(() => {
    //       this.props.dispatch(empty());
    //       this.props.navigation.navigate("HomeScreen");
    //       alert("Thank You for Shopping With Us. Your Order Placed Successfully");
    //     })
    //     .catch((e) => console.log(e));
  };
  calPrice = () => {
    return this.props.cartItems.reduce((total, item) => {
      if (item.discountedPrice) {
        return total + item.discountedPrice * item.units;
      } else {
        return total + item.price * item.units;
      }
    }, 0);
  };

  getTotalQuantity = (data) => {
    return data.reduce((total, item) => {
      return total + item;
    }, 0);
  };

  render() {
    const { theme } = this.props;
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.dark ? "#333" : "white",
            marginTop: -100,
          }}
        >
          {this.props.cartItems.length > 0 ? (
            <View style={{ marginTop: 108, flex: 1 }}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 5,
                    marginHorizontal: 5,
                    paddingVertical: 5,
                    borderColor: "#777",
                    borderWidth: 1,
                    elevation: 1,
                  }}
                >
                  <Text
                    style={{
                      // borderWidth: 2,
                      // borderColor: "#d35400",
                      paddingHorizontal: 5,
                      fontSize: 14,
                      // width: "100%",
                      // fontStyle: "italic",
                      // textAlign: "center",
                      color: theme.dark ? "#fff" : "#000",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Shipping Address:
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      // borderWidth: 2,
                      // borderColor: "#d35400",
                      paddingHorizontal: 5,
                      fontSize: 14,
                      // width: "100%",
                      // fontStyle: "italic",
                      // textAlign: "center",
                      color: theme.dark ? "#fff" : "#000",
                      alignSelf: "center",
                    }}
                  >
                    {this.props.defaultAddress[0].street_address}
                    {" , "}
                    {this.props.defaultAddress[0].city}
                  </Text>
                  <Feather.Button
                    onPress={() => this.props.navigation.navigate("Address")}
                    style={{ backgroundColor: theme.dark ? "#333" : "#fff" }}
                    name="edit"
                    size={24}
                    color="black"
                  />
                </View>
              </View>

              <View style={{ padding: 10, flex: 1 }}>
                <OrderSummary items={this.props.cartItems} />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  //   marginHorizontal: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderTopColor: "#777",
                  borderTopWidth: 1.5,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="info" size={28} color="#777" />
                  <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginRight: 15,
                      }}
                    >
                      {" "}
                      Total :
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        // fontWeight: "bold",
                        // marginRight: 15,
                      }}
                    >
                      {" "}
                      ₹ {this.calPrice()}
                    </Text>
                  </View>
                </View>

                <Button
                  icon="check-bold"
                  mode="contained"
                  onPress={() => this.postData(this.state.data)}
                  style={{ color: "#fff", borderRadius: 10, padding: 2 }}
                >
                  Confirm
                </Button>
              </View>
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text>Hello,{this.state.userID} </Text>
            </View>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  //console.log(state.order);
  return {
    cartItems: state.cart,
    address: state.address,
    defaultAddress: state.address.defaultAddress,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(withTheme(PlaceOrder));
