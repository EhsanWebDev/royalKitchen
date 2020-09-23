import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
  ActivityIndicator,
  Button,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { AuthContext } from "../components/context";
import { SIGNOUT } from "../src/store/actions/auth";
import { connect } from "react-redux";
import Axios from "axios";

function DrawerContent(props) {
  const paperTheme = useTheme();
  const { colors } = useTheme();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const order = await Axios.post(
        "https://gradhatcreators.com/api/user/current_order",
        {
          uid: user.id,
        }
      );
      if (order.data.status) {
        dispatch({ type: "ALL_CURRENT_ORDERS", payload: order.data.source });
        setLoading(false);
      } else {
        console.log("Error =>", order.data);
        setLoading(false);
        return;
      }
      // console.log(order.data);
      // //  if (order_history.data.status) {
      // //    setData(order_history.data.source);
      // //    setLoading(false);
      // //  } else {
      // //    alert("Error Occurred");
      // //    setLoading(false);
      // //    return;
      //  }

      //  //   console.log(order_history.data);
    };
    // console.log("orders", props.orders);

    fetchData();
  }, []);
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const { user, dispatch } = props;
  const SignOut = async () => {
    // signOut();
    await dispatch(SIGNOUT());
  };

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
    <View style={{ flex: 1, backgroundColor: theme.dark ? "#000" : "#333" }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View
              style={{ flexDirection: "row", marginTop: 15, marginBottom: 20 }}
            >
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title
                  style={[
                    styles.title,
                    // {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}
                >
                  {user && user.fname}
                </Title>
                <Caption
                  style={[
                    styles.caption,
                    // {color: paperTheme.dark ? '#fff' : '#000'},
                  ]}
                >
                  {user && user.email}
                </Caption>
              </View>
            </View>
          </View>
          <Drawer.Section title="Most Recent Orders">
            <View style={{ flex: 1, paddingLeft: 20 }}>
              {props.orders &&
                props.orders.map((item, index) => {
                  if (index < 2) {
                    return (
                      <View key={item.id} style={{ flex: 1 }}>
                        <Text>Order Id : {item.id}</Text>
                        <View
                          style={{ marginVertical: 5, flexDirection: "row" }}
                        >
                          <Text style={{ marginRight: 10, padding: 3 }}>
                            {" "}
                            Status :
                          </Text>
                          <Text
                            style={{
                              backgroundColor: "#e67e22",
                              color: "#fff",
                              padding: 3,
                              paddingHorizontal: 5,
                              borderRadius: 10,
                              // fontWeight: "bold",
                            }}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                })}
              {props.orders && (
                <View style={{ alignItems: "flex-end" }}>
                  <Button
                    onPress={() => props.navigation.navigate("Profile")}
                    icon="arrow-right"
                    style={{ marginTop: 18 }}
                    labelStyle={{ color: "#fff" }}
                  >
                    See All Active Orders
                  </Button>
                </View>
              )}
              {!props.orders && (
                <View style={{}}>
                  <Text>No active orders.</Text>
                </View>
              )}
            </View>
          </Drawer.Section>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="grid" color={color} size={size} />
              )}
              label="Categories"
              onPress={() => {
                props.navigation.navigate("Categories");
              }}
            />
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            /> */}
            {/* <DrawerItem
              icon={({color, size}) => (
                <Icon name="cog" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingScreen');
              }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => SignOut()}
        />
      </Drawer.Section>
    </View>
  );
}
const mapStateToProps = ({ auth, orders }) => ({
  user: auth.user,
  orders: orders.orders,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
