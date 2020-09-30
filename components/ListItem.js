import { Picker } from "@react-native-community/picker";
import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, useTheme, Snackbar } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart } from "../src/store/actions";

const ListItem = (props) => {
  const { item } = props;
  const theme = useTheme();
  const [size, setSize] = useState(item.size ? item.size[0] : "");
  const addToCart = (data) => {
    //   ToastAndroid.show(
    //     `${data.name} Added to the Cart !`,
    //     ToastAndroid.SHORT,
    //   );
    if (size === "") {
      showMessage({
        message: "Please Select Size",
        type: "danger",
      });
      return;
    } else {
      showMessage({
        message: `${data.name} Added to the Cart !`,
        type: "success",
        duration: 1500, //Duration of flash-message(in milliseconds),
        floating: true, //floating flash-message,
        titleStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        icon: "info",
      });
      // alert(size);
      let prc;
      if (size === "full" || size === "large") {
        prc = item.max_price;
      } else if (size === "medium") {
        prc = item.avg_price;
      } else {
        prc = item.min_price;
      }
      const cartItem = { ...data, size: size, price: prc };
      console.log("cart", cartItem);
      props.addToCart(cartItem);
    }
  };
  const setFoodSize = (itemVal) => {
    setSize(itemVal);
  };
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 10,
        borderColor: "#777",
        borderWidth: 0.5,
        borderRadius: 8,
      }}
    >
      <View>
        {/* <Image
          source={{uri: item.image}}
          style={{width: '100%', height: 200}}
        /> */}
        <View style={{ position: "relative" }}>
          <Image
            style={{ width: "100%", height: 200, resizeMode: "contain" }}
            source={{
              uri: item.image,
              // headers: {Authorization: 'someAuthToken'},
              // priority: FastImage.priority.high,
            }}
            // resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            style={{
              backgroundColor: theme.dark ? "#fff" : "#333",
              padding: 5,
              position: "absolute",
              bottom: 0,
              left: 0,
              fontSize: 22,
              fontWeight: "bold",
              color: theme.dark ? "#333" : "#fff",
              borderRadius: 20,
            }}
          >
            ₹ {item.max_price}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: theme.dark ? "#fff" : "#333",
            borderRadius: 15,
            marginHorizontal: 16,
            marginTop: 1,
            marginBottom: 12,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            opacity: 0.95,
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{ width: 50, height: 40, borderRadius: 8 }}
          />

          <View style={{ marginHorizontal: 28 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.dark ? "#333" : "#fff",
              }}
            >
              {item.name}
            </Text>
            <Text style={{ fontSize: 12, color: theme.dark ? "#333" : "#fff" }}>
              {item.desc}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginHorizontal: 24, marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: theme.dark ? "#333" : "#333",
              fontWeight: "bold",
            }}
          >
            Choose Size
          </Text>
          <Picker
            mode="dropdown"
            style={{ width: "60%", height: 20 }}
            itemStyle={{ fontWeight: "bold", color: "red" }}
            selectedValue={size}
            onValueChange={(itemValue, itemIndex) => setFoodSize(itemValue)}
          >
            {item.size &&
              item.size.map((i) => {
                console.log(item);
                if (i.toLowerCase() === "full" || i.toLowerCase() === "large") {
                  return (
                    <Picker.Item
                      key={i}
                      label={`${i} ${item.max_price}`}
                      value={i}
                    />
                  );
                } else if (i.toLowerCase() === "medium") {
                  return (
                    <Picker.Item
                      key={i}
                      label={`${i} ${item.avg_price}`}
                      value={i}
                    />
                  );
                } else {
                  return (
                    <Picker.Item
                      key={i}
                      label={`${i} ${item.min_price}`}
                      value={i}
                    />
                  );
                }
              })}
          </Picker>
        </View>
        <Button
          onPress={() => addToCart({ ...item, units: 1 })}
          mode="contained"
          icon="plus"
          style={{ backgroundColor: "#27ae60", marginBottom: 15 }}
        >
          Add to cart
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  console.log("state =>", state);
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addToCart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
