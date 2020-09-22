import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
class CartItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //   calPercentage = (price, discountRate) => {
  //     const dis = discountRate / 100;
  //     var totalValue = price - price * dis;
  //     return totalValue;
  //   };

  renderItems(items, onPress) {
    return items.map((item) => (
      <View key={item.id} style={styles.mainContainer}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              height: 140,
              width: 140,
              borderRadius: 5,
              resizeMode: "cover",
            }}
          />
          <View
            style={{
              flexDirection: "row",
              paddingVertical: 10,
              justifyContent: "space-between",
              alignItems: "center",
              // flex: 1,
            }}
          >
            <View style={{}}>
              <Text style={{ marginLeft: 1, fontSize: 20, fontWeight: "bold" }}>
                {item.name}
              </Text>
              {item.discountedPrice ? (
                <View style={{ paddingVertical: 5 }}>
                  <Text style={{ fontSize: 14 }}>
                    Discounted Price: RS
                    <Text style={{ fontSize: 14, paddingVertical: 5 }}>
                      {" "}
                      {item.discountedPrice}
                    </Text>
                  </Text>
                </View>
              ) : (
                <View style={{ paddingVertical: 5 }}>
                  <Text style={{ fontSize: 14 }}>
                    Unit Price:
                    <Text style={{ fontSize: 14 }}> {item.price} ₹ </Text>
                  </Text>
                </View>
              )}
              <Text style={{ fontSize: 14, paddingVertical: 5 }}>
                Total Price: {item.units * item.price} ₹
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginRight: 70,
                  }}
                >
                  <Button
                    mode="contained"
                    compact={true}
                    onPress={() => this.props.removeOne(item)}
                    labelStyle={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: "#333",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    -
                  </Button>

                  <Button
                    mode="contained"
                    disabled
                    compact={true}
                    // onPress={() => this.props.addItem(item)}
                    labelStyle={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#333",
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: "#dfe6e9",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    {item.units}
                  </Button>

                  <Button
                    mode="contained"
                    compact={true}
                    onPress={() => this.props.addItem(item)}
                    labelStyle={{
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      backgroundColor: "#333",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    +
                  </Button>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Button
                    mode="contained"
                    compact={true}
                    onPress={() => this.props.RemoveEntire(item)}
                    labelStyle={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#fff",
                    }}
                    style={{
                      height: 26,
                      width: 26,
                      borderRadius: 13,
                      backgroundColor: "#c0392b",
                      justifyContent: "center",
                      marginRight: 8,
                    }}
                  >
                    x
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    ));
  }

  render() {
    return (
      <ScrollView>
        {this.props.items
          ? this.renderItems(this.props.items, this.props.onPress)
          : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    overflow: "hidden",
    paddingRight: 10,
    // paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 0.7,
    marginHorizontal: 8,
    borderRadius: 5,
    borderColor: "#ccc",
  },
});

export default CartItems;
