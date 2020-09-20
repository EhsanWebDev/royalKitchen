import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
const ShoppingCartIcon = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const theme = useTheme();
  return (
    <View
      style={[
        { padding: 5, backgroundColor: props.dark ? "#333" : "transparent" },
        Platform.OS == "android" ? styles.iconContainer : null,
      ]}
    >
      <View
        style={{
          position: "absolute",
          height: 20,
          width: 20,
          borderRadius: 15,
          backgroundColor: theme.dark ? "#fff" : "#333",
          right: 10,
          bottom: 30,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
        }}
      >
        <Text
          style={{
            color: theme.dark ? "#000" : "#fff",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {props.cartItems.length}
        </Text>
      </View>
      <Ionicons.Button
        onPress={() => navigation.navigate("Cart")}
        name="ios-cart"
        size={28}
        color={props.dark ? "#fff" : props.color}
        backgroundColor={props.dark ? "#333" : "transparent"}
        // style={{color: '#fff'}}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  //   console.log(state);
  return {
    cartItems: state.cart,
  };
};

export default connect(mapStateToProps)(ShoppingCartIcon);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    marginRight: 10,
  },
});
