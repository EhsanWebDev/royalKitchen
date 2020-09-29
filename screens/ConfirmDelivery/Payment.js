import React, { Component } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { WebView } from "react-native-webview";
export default class Payment extends Component {
  state = { loading: true };
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
      // maybe close this view?
      alert("Payment Successful");
      return;
    }

    // one way to handle errors is via query string
    if (url.includes("?errors=true")) {
      this.webview.stopLoading();
    }

    // redirect somewhere else
    if (url.includes("google.com")) {
      const newURL = "https://reactnative.dev/";
      const redirectTo = 'window.location = "' + newURL + '"';
      this.webview.injectJavaScript(redirectTo);
    }
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  render() {
    const { loading } = this.state;
    if (loading) {
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
          uri:
            "http://gradhatcreators.com/razorpay/checkout?price=55&user_id=5",
        }}
        ref={(ref) => (this.webview = ref)}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }
}
