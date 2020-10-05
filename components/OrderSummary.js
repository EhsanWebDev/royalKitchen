import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
// import { Container, Header, Content, Item, Button } from "native-base";
// import { Input } from "react-native-elements";
// import { uniqBy, filter } from "lodash";
import Axios from "axios";
// import { URL } from "../utls";
import { connect } from "react-redux";
import {
  Button,
  TextInput,
  withTheme,
  ActivityIndicator,
} from "react-native-paper";
import { Picker } from "@react-native-community/picker";
class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      promo: "",
      promoRes: null,
      PromoDis: 0,
      pm: "",
    };
  }

  renderProdList = (data) => {
    return data.map((item, index) => (
      <View key={index}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: 5,
            borderBottomWidth: 2,
            borderBottomColor: "#d2d2d2",
            marginBottom: 10,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          >
            {/* <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            /> */}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 5 }}>{item.name} </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <Text style={{ fontSize: 16, marginRight: 20 }}>
                Size: {item.size}
              </Text> */}
              <Text style={{ fontSize: 16, marginRight: 20 }}>
                Qty: {item.units}{" "}
              </Text>
              {/* <Text style={{ fontSize: 14, marginBottom: 5 }}>
              Store Name: {item.store}{" "}
            </Text> */}

              {item.discountedPrice ? (
                <View>
                  <Text style={{ fontSize: 16, fontWeight: "400" }}>
                    Unit Price: RS
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        fontSize: 12,
                        padding: 5,
                      }}
                    >
                      {" "}
                      {item.price}{" "}
                    </Text>
                    <Text
                      style={{ fontSize: 18, fontWeight: "600", padding: 5 }}
                    >
                      {" "}
                      {item.discountedPrice}{" "}
                    </Text>
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={{ fontSize: 14, fontWeight: "700" }}>
                    ₹<Text style={{ fontSize: 14 }}> {item.price} </Text>
                  </Text>
                </View>
              )}
            </View>

            {/* <Text style={{ fontSize: 16 }}>
              Total Amount: {item.price * item.units}{" "}
            </Text> */}
          </View>
        </View>
      </View>
    ));
  };

  async componentDidMount() {
    const coup = await Axios.get(
      "https://gradhatcreators.com/api/user/coupons"
    );
    this.setState({ loading: false });
    // console.log(coup);
  }
  render() {
    const { theme, selected, handlePM } = this.props;
    const { colors } = theme;
    const { pm } = this.state;
    if (this.state.loading) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {!this.props.hideCoupon && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  mode="outlined"
                  label="ENTER PROMO CODE"
                  onChangeText={(value) => this.props.promo(value)}
                  theme={{
                    colors: { text: colors.dark, placeholder: colors.dark },
                  }}
                  style={{
                    backgroundColor: "#fff",
                    fontSize: 13,
                    height: 38,
                    width: Dimensions.get("screen").width / 1.4,
                  }}
                />
                <Button
                  mode="contained"
                  style={{ marginTop: 6 }}
                  onPress={() => this.props.handleCoupon()}
                >
                  Check
                </Button>
              </View>
            )}
            <View
              style={{
                borderBottomColor: "#000",
                borderBottomWidth: 2,
                marginTop: 10,
              }}
            >
              <Picker
                mode="dropdown"
                selectedValue={selected}
                style={{ height: 50 }}
                onValueChange={(itemValue, itemIndex) => handlePM(itemValue)}
              >
                <Picker.Item label="Select Payment Method" value="" />
                <Picker.Item label="Pay with Reward's Wallet" value="reward" />
                <Picker.Item label="Credit Card Payment" value="credit" />
              </Picker>
            </View>
            {/* {this.state.isPromo === null ? (
              <Text style={{ fontSize: 16, color: "red", fontWeight: "bold" }}>
                Promo doesn't Exist
              </Text>
            ) : null} */}
            {/* {this.state.promoRes === null ? null : this.state.promoRes ===
              0.0 ? (
              <Text style={{ fontSize: 16, color: "red", fontWeight: "bold" }}>
                You have used this promo
              </Text>
            ) : (
              <Text>{this.state.promoRes}</Text>
            )} */}
            {/*(() => {
              switch (this.state.promoRes) {
                case null:
                  return <Text>Promo not Exist</Text>;
                case 1:
                  return null;
                case 2:
                  return null;
                default:
                  return null;
              }
            })()*/}

            <Button

            //   onPress={() => this.UniqueByID(this.state.promo)}
            >
              <Text style={{ color: "#fff", padding: 5, fontSize: 16 }}>
                CHECK
              </Text>
            </Button>
          </View>

          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
              marginLeft: 10,
              marginBottom: 5,
            }}
          >
            Order Summary
          </Text>

          {this.props.items ? this.renderProdList(this.props.items) : null}
          {/* <Text style={{ fontWeight: "600", fontSize: 18, marginVertical: 5 }}>
            Total Price = {this.calPrice(this.props.items)}{" "}
          </Text> */}
          {/* <View style={{ flex: 1 }}></View> */}
          {/* <Text style={{ fontSize: 16, marginVertical: 5 }}>
            Discount ={" "}
            {this.state.promoRes !== null
              ? this.state.promoRes === 0.0
                ? 0.0
                : this.state.promoRes
              : 0.0}
          </Text> */}
          {/* <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              marginVertical: 5,
              borderTopColor: "#ddd",
              paddingVertical: 10,
              borderTopWidth: 2,
            }}
          >
            Grand Total =
            {this.calPrice(this.props.items) - this.state.promoRes !== null
              ? this.state.promoRes === 0.0
                ? 0.0
                : this.state.promoRes
              : 0.0}
          </Text> */}
        </ScrollView>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state.user);
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(withTheme(OrderSummary));
