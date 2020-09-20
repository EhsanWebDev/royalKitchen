import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { Button, Text, TextInput, Title, useTheme } from "react-native-paper";
import { Picker } from "@react-native-community/picker";

const TakeAway = ({ coords }) => {
  const theme = useTheme();
  const { colors } = useTheme();
  const [city, setCity] = useState("");
  const [res, setRes] = useState("");

  useEffect(() => {
    // console.log(props);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#333" : "#fff",
        // marginHorizontal: 16,
        padding: 10,
      }}
    >
      <Title style={{ color: "red" }}>Select city and restaurant</Title>
      <View
        style={{
          borderBottomColor: "#000",
          borderBottomWidth: 2,
          marginTop: 10,
        }}
      >
        <Picker
          mode="dropdown"
          selectedValue={city}
          style={{ height: 50, color: "grey" }}
          onValueChange={(itemValue, itemIndex) => setCity(itemValue)}
        >
          <Picker.Item label="Select Your City" value="" />
          <Picker.Item label="Delhi" value="java" />
          <Picker.Item label="Bombay" value="js" />
        </Picker>
      </View>

      <View
        style={{
          borderBottomColor: "#000",
          borderBottomWidth: 2,
          marginTop: 10,
        }}
      >
        <Picker
          mode="dropdown"
          selectedValue={res}
          style={{ height: 50, color: "grey" }}
          onValueChange={(itemValue, itemIndex) => setRes(itemValue)}
        >
          <Picker.Item label="Select Restaurant" value="" />
          <Picker.Item label="Pearl continental" value="java" />
          <Picker.Item label="Avari Restaurant" value="js" />
        </Picker>
      </View>

      <Button mode="contained" style={{ marginTop: 40 }}>
        Continue
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    width: "100%",
    height: 80,
  },
});
export default TakeAway;
