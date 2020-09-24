import React from "react";
import { View, Text, StyleSheet } from "react-native";
// import { getTokens } from "../../utls";
import { connect } from "react-redux";
import axios from "axios";
// import { URL } from "../../utls";
import Constants from "expo-constants";
import OrderSummary from "../../components/OrderSummary";
import { Button, withTheme, ActivityIndicator } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { empty } from "../../src/store/actions";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
// import { placeOrder, empty } from "../../store/actions";
class PlaceOrder extends React.Component {
  state = {
    userID: "",
    loading: true,
    data: [],
    promoRes: null,
    promo: "",
    hideCoupon: false,
    PromoDis: null,
    promoMatch: null,
  };
  handleCoupons = () => {
    const { promoRes, promo } = this.state;
    if (promo.length <= 0) {
      alert("Please enter promo code");
      return;
    }
    const promoMatch = promoRes.find((item) => item.code === promo);

    if (promoMatch) {
      alert(`You'll get ${promoMatch.price}  on your order`);
      this.setState({
        PromoDis: promoMatch.price,
        promoMatch: promoMatch,
        hideCoupon: true,
      });
      return;
    } else {
      alert("Coupon expired or not valid");
    }
    // console.log(this.state.promo);
  };
  promo = (promo) => {
    this.setState({ promo });
  };
  async componentDidMount() {
    const coup = await axios.get(
      "https://gradhatcreators.com/api/user/coupons"
    );
    this.setState({ loading: false, promoRes: coup.data.source });
    console.log(coup);
    // getTokens((val) => {
    //   if (val[0][1] === null) {
    //     this.setState({ loading: false });
    //   } else {
    //     this.setState({ userID: val[0][1], loading: false });

    //   }
    // });
  }

  // getData = (cb) => {

  //   this.setState(
  //     {
  //       data: data,
  //     },
  //     () => {
  //       cb();
  //     }
  //   );
  // };
  getProductsID = () => {
    return this.props.cartItems.map((element) => element);
  };
  getQuantityCount = () => {
    return this.props.cartItems.map((element) => element.units);
  };

  postData = async () => {
    this.setState({ loading: true });
    const data = {};
    const quantities = this.getQuantityCount();

    // * Data
    data.user_id = this.props.user.id;
    data.products = JSON.stringify(this.getProductsID());
    data.quantity = this.getTotalQuantity(quantities);
    (data.type = "delivery"),
      (data.coupon = this.state.promoMatch ? this.state.promoMatch.id : 0),
      (data.price = this.calPrice());
    data.address_id = this.props.defaultAddress[0].id;

    // console.log(data);
    // console.log(JSON.stringify(data));

    const res = await axios.post(
      "https://gradhatcreators.com/api/user/add_order",
      JSON.stringify(data)
    );

    if (!res.data.status) {
      this.setState({ loading: false });
      alert(res.data.message);
      console.log(res.data);
      return;
    } else {
      // alert(res.data.message);
      this.props.dispatch(empty());

      const order_history = await axios.post(
        "https://gradhatcreators.com/api/user/current_order",
        {
          uid: this.props.user.id,
        }
      );
      if (order_history.data.status) {
        // setData(order_history.data.source);

        this.props.dispatch({
          type: "ALL_CURRENT_ORDERS",
          payload: order_history.data.source,
        });
        this.setState({ loading: false });
        this.props.navigation.navigate("OrderSuccess");
      } else {
        alert("Error Occurred while placing your order");
        this.setState({ loading: false });
        return;
      }
    }

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
        <View
          style={[
            styles.loading,
            { backgroundColor: theme.dark ? "#333" : "white" },
          ]}
        >
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
                {this.props.route.params &&
                  this.props.route.params.order_mode === "delivery" && (
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
                        onPress={() =>
                          this.props.navigation.navigate("Address")
                        }
                        style={{
                          backgroundColor: theme.dark ? "#333" : "#fff",
                        }}
                        name="edit"
                        size={24}
                        color="black"
                      />
                    </View>
                  )}
              </View>

              <View style={{ padding: 10, flex: 1 }}>
                <OrderSummary
                  hideCoupon={this.state.hideCoupon}
                  promo={this.promo}
                  handleCoupon={this.handleCoupons}
                  items={this.props.cartItems}
                />
              </View>
              {this.state.PromoDis && (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginVertical: 10,
                  }}
                >
                  You'll get {this.state.PromoDis}₹ discount on your order !{" "}
                </Text>
              )}
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
                      style={
                        {
                          // fontWeight: "bold",
                          // marginRight: 15,
                        }
                      }
                    >
                      <Text
                        style={{
                          textDecorationLine:
                            this.state.PromoDis && "line-through",
                          fontSize: 14,
                        }}
                      >
                        ₹ {this.calPrice()}
                      </Text>
                      {"  "}
                      {this.state.PromoDis && (
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                          ₹{this.calPrice() - this.state.PromoDis}
                        </Text>
                      )}
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
              <Icon name="cart" size={48} color="#777" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "#777",
                  marginHorizontal: 30,
                }}
              >
                Nothing to see, Please add some items into your cart to place
                order ...{" "}
              </Text>
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

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PlaceOrder));
