import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button, Title, withTheme } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
class Payment extends Component {
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
        <View style={{ flex: 1, marginTop: 100, justifyContent: "center" }}>
          <Title
            style={{ color: theme.dark ? "#fff" : "#000", textAlign: "center" }}
          >
            Choose Payment Method
          </Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <FontAwesome5 name="wallet" size={24} color="#c23616" />
            <Button
              onPress={() =>
                this.props.navigation.navigate("Wallet", {
                  PromoDis: this.props.route.params.PromoDis,
                  promoMatch: this.props.route.params.promoMatch,
                  order_mode: this.props.route.params.order_mode,
                })
              }
            >
              Pay with Reward's Wallet
            </Button>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome5 name="credit-card" size={24} color="#c23616" />
            <Button
              onPress={() =>
                this.props.navigation.navigate("CardPay", {
                  PromoDis: this.props.route.params.PromoDis,
                  promoMatch: this.props.route.params.promoMatch,
                  order_mode: this.props.route.params.order_mode,
                })
              }
            >
              Credit Card Payment
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
export default withTheme(Payment);
