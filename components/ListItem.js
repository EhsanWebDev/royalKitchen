import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addToCart } from "../src/store/actions";
// import FastImage from "react-native-fast-image";

const ListItem = (props) => {
  const { item } = props;
  const theme = useTheme();
  const addToCart = (data) => {
    //   ToastAndroid.show(
    //     `${data.name} Added to the Cart !`,
    //     ToastAndroid.SHORT,
    //   );

    props.addToCart(data);
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
      <TouchableOpacity>
        {/* <Image
          source={{uri: item.image}}
          style={{width: '100%', height: 200}}
        /> */}

        <Image
          style={{ width: "100%", height: 200 }}
          source={{
            uri: item.image,
            // headers: {Authorization: 'someAuthToken'},
            // priority: FastImage.priority.high,
          }}
          // resizeMode={FastImage.resizeMode.cover}
        />
        <View
          style={{
            backgroundColor: theme.dark ? "#fff" : "#333",
            borderRadius: 15,
            marginHorizontal: 16,
            marginTop: -50,
            marginBottom: 12,
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            opacity: 0.95,
          }}
        >
          {/* <FastImage
            source={{ uri: item.image, priority: FastImage.priority.low }}
            style={{ width: 50, height: 40, borderRadius: 8 }}
          /> */}

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
      </TouchableOpacity>

      <View style={{ marginHorizontal: 24, marginTop: 10 }}>
        <Button
          onPress={() => addToCart({ ...item, units: 1 })}
          mode="contained"
          icon="plus"
          style={{ backgroundColor: "#27ae60", marginBottom: 15 }}
        >
          Add to cart
        </Button>
      </View>
      <Text
        style={{
          backgroundColor: theme.dark ? "#fff" : "#333",
          padding: 5,
          position: "absolute",
          top: 0,
          right: 0,
          fontSize: 22,
          fontWeight: "bold",
          color: theme.dark ? "#333" : "#fff",
        }}
      >
        ₹ {item.price}
      </Text>
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
