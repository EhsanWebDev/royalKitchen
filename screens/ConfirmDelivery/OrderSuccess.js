import React from "react";
import { View, Text } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
// import { Container } from './styles';

const OrderSuccess = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ddd", marginTop: -100 }}>
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="md-happy" size={50} color="#777" />
        <Text style={{ fontSize: 18, color: "#777" }}>
          Your Order Placed Successfully.
        </Text>
        <Button
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Home")}
        >
          Return Home
        </Button>
      </View>
    </View>
  );
};

export default OrderSuccess;
