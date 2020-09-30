import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  useTheme,
  Button,
  ActivityIndicator,
} from "react-native-paper";

import {
  MaterialCommunityIcons as Icon,
  Ionicons,
  Entypo,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import Axios from "axios";
import CartIcon from "./Cart/CartIcon";

const ProfileScreen = ({ user, navigation, defaultAddress }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    // console.log(user.id);
    setLoading(true);
    const fetch = async () => {
      const res = await Axios.post(
        "http://gradhatcreators.com/api/user/get_user",
        {
          uid: user.id,
        }
      );

      if (!res.data.status) {
        alert("Error occurred");
        setLoading(false);
        return;
      } else {
        setUserData(res.data.source);
        const ords = await Axios.post(
          "https://gradhatcreators.com/api/user/current_order",
          {
            uid: user.id,
          }
        );
        if (ords.data.status) {
          setOrders(ords.data.source.length);
        }
        setLoading(false);
        // console.log(res.data);
      }
    };

    fetch();

    return () => {};
  }, [navigation]);
  if (loading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.dark ? "#333" : "#fff" },
      ]}
    >
      <View
        style={{
          flex: 1,
          marginHorizontal: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CartIcon dark={theme.dark ? true : false} color="#333" />
        {/* <ImageBackground
            style={{ width: "70%", height: 60, alignSelf: "center" }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80",
            }}
          > */}
        <Text
          style={{
            fontSize: 24,
            marginBottom: 12,
            marginTop: 10,
            // marginRight: 20,
            color: theme.dark ? "#fff" : "#333",
            // alignSelf: "center",
          }}
        >
          Royal Kitchen
        </Text>
        <Ionicons.Button
          name="ios-menu"
          // style={{bordebott: 120}}
          size={32}
          color={theme.dark ? "#fff" : "#333"}
          backgroundColor={theme.dark ? "#333" : "#fff"}
          onPress={() => navigation.openDrawer()}
        />
        {/* </ImageBackground> */}
      </View>

      <View style={styles.userInfoSection}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Avatar.Image
            source={require("../assets/man.png")}
            size={80}
            style={{ alignSelf: "center", zIndex: 100 }}
          />
        </View>
      </View>
      <View
        style={{
          height: 180,
          marginTop: -60,
          backgroundColor: "#B33771",
          marginBottom: 60,
          borderBottomLeftRadius: 80,
          borderBottomRightRadius: 80,
        }}
      >
        <Title
          style={[
            styles.title,
            {
              marginTop: 40,
              marginBottom: 5,
              color: "#fff",
              textAlign: "center",
            },
          ]}
        >
          {user.fname}
        </Title>
        <View
          style={{
            flexDirection: "row",

            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View
            style={{
              borderRightColor: "#fff",
              borderRightWidth: 1,
              paddingHorizontal: 25,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Phone
            </Text>
            {/* <Icon name="phone" color="#fff" size={20} /> */}
            <Text style={{ color: "#fff" }}>{user.phone}</Text>
          </View>
          <View style={{}}>
            <Text
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Email
            </Text>
            {/* <Icon name="email" color="#fff" size={20} /> */}
            <Text style={{ color: "#fff", marginLeft: 20 }}>{user.email}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              backgroundColor: "#333",
              borderRadius: 20,
              marginHorizontal: 16,
              marginVertical: 10,
              marginTop: 10,
              marginBottom: 12,
              padding: 12,
              elevation: 5,
              // flexDirection: "row",
              alignItems: "center",
              // opacity: 0.95,
              width: "40%",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff",
                    alignItems: "center",
                  }}
                >
                  Reward Points{" "}
                </Text>
                <Icon
                  name="wallet-giftcard"
                  size={24}
                  color="white"
                  style={{}}
                />
              </View>

              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {user.reward ? user.reward : 0}
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: "#333",
              borderRadius: 20,
              marginHorizontal: 16,
              marginVertical: 10,
              marginTop: 10,
              marginBottom: 12,
              padding: 12,
              elevation: 5,
              // flexDirection: "row",
              alignItems: "center",
              // opacity: 0.95,
              width: "40%",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#fff",
                    alignItems: "center",
                  }}
                >
                  Active Orders{" "}
                </Text>
                <Icon name="arrow-up" size={24} color="white" style={{}} />
              </View>

              <Text
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                {orders}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* <View style={{ marginLeft: 20 }}>
        <Title
          style={[
            styles.title,
            {
              marginTop: 15,
              marginBottom: 5,
              color: theme.dark ? "#fff" : "#333",
            },
          ]}
        >
          {user.fname}
        </Title>
        <Caption
          style={[styles.caption, { color: theme.dark ? "#fff" : "#333" }]}
        >
          {user.user_status}
        </Caption>
      </View> */}
      <View style={[styles.userInfoSection, { marginTop: 10 }]}>
        <Title
          style={{
            color: theme.dark ? "#fff" : "#000",
            fontSize: 28,
            marginBottom: 10,
            // marginLeft: 20,
          }}
        >
          Address
        </Title>
        {defaultAddress && (
          <TouchableRipple onPress={() => navigation.push("Address")}>
            <View style={styles.row}>
              <Icon
                name="square-edit-outline"
                size={24}
                color={theme.dark ? "#fff" : "#000"}
              />

              <Text
                style={{
                  color: theme.dark ? "#fff" : "#000",
                  fontWeight: "bold",
                  marginLeft: 20,
                }}
              >
                {defaultAddress[0].street_address}
              </Text>
            </View>
          </TouchableRipple>
        )}
        {!defaultAddress && (
          <TouchableRipple onPress={() => navigation.push("Address")}>
            <View style={styles.row}>
              <Icon name="square-edit-outline" size={24} color="black" />

              <Text
                style={{
                  color: theme.dark ? "#fff" : "#000",
                  fontSize: 18,
                  marginLeft: 20,
                }}
              >
                Select your default address
              </Text>
            </View>
          </TouchableRipple>
        )}

        {/* <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
        </View> */}
      </View>

      {/* <View style={styles.infoBoxWrapper}> */}
      {/* <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title style={{ color: theme.dark ? "#fff" : "#333" }}>₹140.50</Title>
          <Caption style={{ color: theme.dark ? "#fff" : "#333" }}>
            Wallet
          </Caption>
        </View> */}
      {/* <View style={styles.infoBox}>
          <Title style={{ color: theme.dark ? "#fff" : "#333" }}>
            {user.reward ? user.reward : 0}
          </Title>
          <Caption style={{ color: theme.dark ? "#fff" : "#333" }}>
            Reward Points
          </Caption>
        </View> */}
      {/* </View> */}

      <View style={styles.menuWrapper}>
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple> */}
        <TouchableRipple onPress={() => navigation.push("Address")}>
          <View style={styles.menuItem}>
            <Icon name="home" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Manage Your addresses</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.push("OrderHistory")}>
          <View style={styles.menuItem}>
            <Icon name="history" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Order History</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.push("CurrentOrders")}>
          <View style={styles.menuItem}>
            <Entypo name="new" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Current Orders</Text>
          </View>
        </TouchableRipple>
        {/* <TouchableRipple onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple> */}
        {/* <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple> */}
      </View>
    </ScrollView>
  );
};
const mapStateToProps = ({ auth, address }) => ({
  user: auth.user,
  defaultAddress: address.defaultAddress,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
