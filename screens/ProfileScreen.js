import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView } from "react-native";
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

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import Axios from "axios";

const ProfileScreen = ({ user, navigation, defaultAddress }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setLoading(false);
        console.log(res.data);
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
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
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
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        {defaultAddress && (
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />

            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {defaultAddress[0].street_address}
            </Text>
          </View>
        )}
        {!defaultAddress && (
          <TouchableRipple onPress={() => navigation.push("Address")}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#777777" size={20} />

              <Text style={{ color: "#FF6347", marginLeft: 20 }}>
                Select your default address
              </Text>
            </View>
          </TouchableRipple>
        )}

        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
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
        <View style={styles.infoBox}>
          <Title style={{ color: theme.dark ? "#fff" : "#333" }}>
            {user.reward}
          </Title>
          <Caption style={{ color: theme.dark ? "#fff" : "#333" }}>
            Reward Points
          </Caption>
        </View>
      </View>

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
