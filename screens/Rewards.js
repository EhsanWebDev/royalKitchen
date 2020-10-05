import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Button,
  Headline,
  Paragraph,
  Title,
  withTheme,
} from "react-native-paper";
import { FontAwesome5, SimpleLineIcons, Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
class Rewards extends Component {
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // justifyContent: "space-around",
              marginHorizontal: 20,
            }}
          >
            <Feather
              name="arrow-left"
              size={26}
              style={{ paddingRight: 60 }}
              onPress={() => this.props.navigation.navigate("Profile")}
            />
            <Title
              style={{
                color: theme.dark ? "#fff" : "#111",
                textAlign: "center",
                alignItems: "center",
                marginVertical: 20,
                fontSize: 24,
              }}
            >
              Your Reward Wallet
            </Title>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <SimpleLineIcons name="wallet" size={200} color="#ccc" />
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Headline
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Your Reward Wallet Balance :{" "}
              {this.props.user && this.props.user.reward
                ? this.props.user.reward
                : 0}
            </Headline>
            <Title
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Rewards spent :{" "}
              {this.props.user && this.props.user.used_rewards
                ? this.props.user.used_rewards
                : 0}
            </Title>
            {/* <Paragraph
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Total Spent :
            </Paragraph> */}
            {/* <Paragraph
              style={{
                color: theme.dark ? "#fff" : "#000",
                textAlign: "center",
              }}
            >
              Total Amount To Pay :{" "}
            </Paragraph> */}
            {/* <View
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
            </View> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Rewards));
