import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, withTheme } from "react-native-paper";
import { connect } from "react-redux";
import CartItems from "../../components/CartItems";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
// const data = [
//   {
//     id: 1,
//     img:
//       'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
//     name: 'Dessert',
//     price: 3,
//     units: 3,
//   },
// ];
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const theme = this.props.theme;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.dark ? "#000" : "#fff",
          marginTop: -90,
        }}
      >
        {this.props.cartItems.length > 0 ? (
          <View style={{ flex: 1, marginTop: 95 }}>
            <CartItems
              items={this.props.cartItems}
              RemoveEntire={this.props.removeItem}
              addItem={this.props.addItem}
              removeOne={this.props.removeOne}
            />
            <View
              style={{ marginHorizontal: 40, marginTop: 5, marginBottom: 10 }}
            >
              <Button
                mode="contained"
                style={{
                  width: "100%",
                  backgroundColor: "#e84118",
                  justifyContent: "space-around",
                }}
                onPress={() =>
                  this.props.navigation.navigate("ConfirmDelivery")
                }
              >
                Checkout
                {/* <Text style={{color: '#fff', fontSize: 20, fontWeight: '500'}}>
                  Total Price:9 $
                </Text> */}
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Icon name="cart" size={48} color="#777" />
            <Text
              style={{
                // color: 'seagreen',
                fontSize: 20,
                color: "#777",
                // fontWeight: 'bold',
                textAlign: "center",
              }}
            >
              No items in your cart
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartItems: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (product) =>
      dispatch({ type: "REMOVE_FROM_CART", payload: product }),
    addItem: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
    removeOne: (product) => dispatch({ type: "REMOVE_ONE", payload: product }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Cart));
