import React from "react";
import { View, Text } from "react-native";

// import { Container } from './styles';

const UnAuth = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={{ color: "#000" }}>You're not logged in </Text>
    </View>
  );
};

export default UnAuth;
