import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  useTheme,
  withTheme,
} from "react-native-paper";
import styled from "styled-components/native";
import ListItem from "./ListItem";
import CartIcon from "../screens/Cart/CartIcon";

import { Ionicons as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import Axios from "axios";

const SubCategory = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    // console.log(props.id);
    const fetchData = async () => {
      const res = await Axios.post(
        "https://gradhatcreators.com/api/user/products",
        {
          cid: route.params.id,
        }
      );
      if (res.data.status) {
        setData(res.data.source);
        setLoading(false);
      } else {
        setLoading(false);
        alert("error occurred");
        console.log(res.data);
      }
      // console.log('Response', res);
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (data.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          //   justifyContent: "center",
          backgroundColor: "white",
          //   alignItems: "center",
          //   marginTop: -100,
        }}
      >
        <StatusBar
          backgroundColor={theme.dark ? "#333" : "#fff"}
          barStyle={theme.dark ? "default" : "dark-content"}
        />
        <View
          style={{
            backgroundColor: theme.dark ? "#333" : "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon.Button
              name="ios-menu"
              // style={{bordebott: 120}}
              size={32}
              color={theme.dark ? "#fff" : "#333"}
              backgroundColor={theme.dark ? "#333" : "#fff"}
              onPress={() => navigation.openDrawer()}
            />
            <Text
              style={{
                fontSize: 32,
                marginBottom: 12,
                marginTop: 10,
                color: theme.dark ? "#fff" : "#333",
              }}
            >
              {route.params && route.params.title}
            </Text>
          </View>

          <CartIcon dark={theme.dark ? true : false} color="#333" />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontSize: 24,
              // fontWeight: 'bold',
              // alignItems: 'center',
              // justifyContent: 'center',
            }}
          >
            <Icon name="ios-alert" size={32} /> No Products found
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        backgroundColor={theme.dark ? "#333" : "#fff"}
        barStyle={theme.dark ? "default" : "dark-content"}
      />
      <View
        style={{
          backgroundColor: theme.dark ? "#333" : "#fff",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon.Button
            name="ios-menu"
            // style={{bordebott: 120}}
            size={32}
            color={theme.dark ? "#fff" : "#333"}
            backgroundColor={theme.dark ? "#333" : "#fff"}
            onPress={() => navigation.openDrawer()}
          />
          <Text
            style={{
              fontSize: 32,
              marginBottom: 12,
              marginTop: 10,
              color: theme.dark ? "#fff" : "#333",
            }}
          >
            {route.params && route.params.title}
          </Text>
        </View>

        <CartIcon dark={theme.dark ? true : false} color="#333" />
      </View>
      <FlatList
        data={data}
        style={{ marginTop: 10 }}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ListItem item={item} />}
      />
    </View>
  );
};

export default SubCategory;
