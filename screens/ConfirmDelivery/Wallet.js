import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Paragraph, Title, withTheme } from "react-native-paper";
import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
class Wallet extends Component {
  getProductsID = () => {
    return this.props.cartItems.map((element) => element);
  };
  getQuantityCount = () => {
    return this.props.cartItems.map((element) => element.units);
  };
  getTotalQuantity = (data) => {
    return data.reduce((total, item) => {
      return total + item;
    }, 0);
  };
  postData = async () => {
    // this.props.navigation.navigate("Payment");
    // this.setState({ loading: true });
    const data = {};
    const quantities = this.getQuantityCount();

    // * Data
    data.user_id = this.props.user.id;
    data.products = JSON.stringify(this.getProductsID());
    data.quantity = this.getTotalQuantity(quantities);
    (data.type =
      this.props.route.params.order_mode === "delivery"
        ? "delivery"
        : "takeaway"),
      (data.coupon = this.props.route.params.promoMatch
        ? this.props.route.params.promoMatch
        : 0),
      (data.price = this.calPrice() - this.props.route.params.PromoDis);
    data.address_id =
      this.props.route.params.order_mode === "delivery"
        ? this.props.defaultAddress[0].id
        : 0;
    data.payment_type = "card";
    console.log(data);
    // console.log(JSON.stringify(data));

    // const res = await axios.post(
    //   "https://gradhatcreators.com/api/user/add_order",
    //   JSON.stringify(data)
    // );

    // if (!res.data.status) {
    //   this.setState({ loading: false });
    //   alert(res.data.message);
    //   console.log(res.data);
    //   return;
    // } else {
    //   // alert(res.data.message);
    //   this.props.dispatch(empty());

    //   const order_history = await axios.post(
    //     "https://gradhatcreators.com/api/user/current_order",
    //     {
    //       uid: this.props.user.id,
    //     }
    //   );
    //   if (order_history.data.status) {
    //     // setData(order_history.data.source);

    //     this.props.dispatch({
    //       type: "ALL_CURRENT_ORDERS",
    //       payload: order_history.data.source,
    //     });
    //     this.setState({ loading: false });
    //     this.props.navigation.navigate("OrderSuccess");
    //   } else {
    //     alert("Error Occurred while placing your order");
    //     this.setState({ loading: false });
    //     return;
    //   }
    // }
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
  render() {
    const { theme } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark ? "#333" : "white",
          marginTop: -100,
        }}
      >
        <View style={{ flex: 1, marginTop: 100 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <SimpleLineIcons name="wallet" size={200} color="#ccc" />
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Title
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Your Reward Wallet Balance :{" "}
              {this.props.user && this.props.user.reward
                ? this.props.user.reward
                : 0}
            </Title>
            <Paragraph
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Order Type : {this.props.route.params.order_mode}
            </Paragraph>
            <Paragraph
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Total Amount To Pay :{" "}
              {this.calPrice() - this.props.route.params.PromoDis}
            </Paragraph>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 80,
              }}
            >
              <Button
                mode="contained"
                style={{ width: "60%", borderRadius: 8 }}
                onPress={() => alert("under construction")}
              >
                Pay
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.auth.user);
  return {
    user: state.auth.user,
    cartItems: state.cart,
    address: state.address,
    defaultAddress: state.address.defaultAddress,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Wallet));
