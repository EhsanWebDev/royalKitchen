import React, { Component } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import axios from "axios";
import { empty } from "../../src/store/actions";
class CardPay extends Component {
  state = {
    loading: true,
    userID: "",
    data: [],
    promoRes: null,
    promo: "",
    hideCoupon: false,
    PromoDis: null,
    promoMatch: null,
  };
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
    this.setState({ loading: true });
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
        : "1";
    data.payment_type = "card";
    console.log(data);
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
        this.props.dispatch(empty());
        this.props.navigation.navigate("OrderSuccess");
      } else {
        alert("Error Occurred while placing your order");

        this.setState({ loading: false });
        return;
      }
    }
  };
  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    console.log(newNavState);
    const { url } = newNavState;
    if (!url) return;
    console.log(url);
    // handle certain doctypes
    // if (url.includes(".pdf")) {
    //   this.webview.stopLoading();
    //   // open a modal with the PDF viewer
    //   }

    // one way to handle a successful form submit is via query strings
    if (url.includes("/success")) {
      this.webview.stopLoading();
      this.postData();
      // maybe close this view?
      //   alert("Payment Successful");
      return;
    }

    // one way to handle errors is via query string
    if (url.includes("?errors=true")) {
      this.webview.stopLoading();
    }
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
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
    const { loading } = this.state;
    if (loading || !this.props.user) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#111",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -90,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <WebView
        source={{
          uri: `http://gradhatcreators.com/razorpay/checkout?price=${
            this.calPrice() - this.props.route.params.PromoDis
          }&user_id=${this.props.user.id}`,
        }}
        ref={(ref) => (this.webview = ref)}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }
}
const mapStateToProps = (state) => {
  //   console.log(state.auth.user);
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
export default connect(mapStateToProps, mapDispatchToProps)(CardPay);
