import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Dimensions } from "react-native";
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
  List,
} from "react-native-paper";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { AuthContext } from "../components/context";
import { SIGNOUT } from "../src/store/actions/auth";
import { connect } from "react-redux";
import Axios from "axios";

function DrawerContent(props) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
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
    <View
      style={{
        flex: 1,
        // backgroundColor: "rgba(255,255,255,0.2)",
        // height: Dimensions.get("screen").height,
      }}
    >
      <ImageBackground
        style={{
          flex: 1,
          // resizeMode: "cover",
          opacity: 0.8,
        }}
        blurRadius={1.5}
        source={{
          uri:
            "https://images.unsplash.com/photo-1592382419305-140c7ac8932a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        }}
      >
        <DrawerContentScrollView
          {...props}
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View style={[styles.drawerContent]}>
            <View style={styles.userInfoSection}>
              <View
                style={{
                  // flexDirection: "row",
                  marginTop: 25,
                  // justifyContent: "center",
                  // flex: 1,
                  alignItems: "center",
                  marginBottom: 20,
                  // marginRight: 20,
                }}
              >
                <Avatar.Image
                  source={require("../assets/man.png")}
                  style={{ backgroundColor: "gray" }}
                  size={80}
                />
                {/* <View style={{ marginLeft: 15, flexDirection: "column" }}>
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
                </View> */}
              </View>
            </View>
            {/* <Drawer.Section title="Most Recent Orders">
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
            </Drawer.Section> */}

            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="home-outline"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="Home"
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#fff",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                }}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="grid"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="Menu"
                onPress={() => {
                  props.navigation.navigate("Categories");
                }}
                labelStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="cart"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="My Cart"
                onPress={() => {
                  props.navigation.navigate("Cart");
                }}
                labelStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="package-variant"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="Orders"
                onPress={() => {
                  props.navigation.navigate("Profile", {
                    screen: "CurrentOrders",
                  });
                }}
                labelStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="coin"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="Rewards"
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
                labelStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="home-city"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="Manage Addresses"
                onPress={() => {
                  props.navigation.navigate("Profile", { screen: "Address" });
                }}
                labelStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="contact-phone"
                    color="#fff"
                    size={size}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                  />
                )}
                label="Contact Us"
                onPress={() => {
                  props.navigation.navigate("ContactUs");
                }}
                labelStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                style={{
                  borderBottomColor: "#000",
                  borderBottomWidth: 1,
                }}
              />

              <List.Accordion
                titleStyle={{
                  fontWeight: "bold",
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                  fontSize: 16,
                  color: "#fff",
                }}
                title="Royal Kitchen"
                left={(props) => (
                  <List.Icon
                    {...props}
                    style={{
                      textShadowColor: "#000",
                      textShadowRadius: 2,
                      textShadowOffset: { width: 2, height: 2 },
                    }}
                    color="#fff"
                    icon="folder"
                  />
                )}
              >
                <List.Item
                  title="About Us"
                  onPress={() => props.navigation.navigate("AboutUs")}
                />
                <List.Item title="Terms And Conditions" />
                <List.Item title="Privacy Policy" />
              </List.Accordion>

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
              {/* <DrawerItem
                icon={({ color, size }) => (
                  <Icon
                    name="account-check-outline"
                    color={color}
                    size={size}
                  />
                )}
                label="Support"
                onPress={() => {
                  props.navigation.navigate("SupportScreen");
                }}
              /> */}
            </Drawer.Section>
            {/* <Drawer.Section title="Preferences"> */}

            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text
                  style={{
                    // fontWeight: "bold",
                    fontSize: 14,
                    color: "#fff",
                    textShadowColor: "#000",
                    textShadowRadius: 2,
                    textShadowOffset: { width: 2, height: 2 },
                  }}
                >
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch
                    value={paperTheme.dark}
                    color="red"
                    // style={{ backgroundColor: "white" }}
                  />
                </View>
              </View>
            </TouchableRipple>

            {/* </Drawer.Section> */}
          </View>
        </DrawerContentScrollView>
        <Drawer.Section
          style={[
            styles.bottomDrawerSection,
            {
              backgroundColor: "rgba(0,0,0,0.1)",
            },
          ]}
        >
          <DrawerItem
            icon={({ color, size }) => (
              <Icon
                name="exit-to-app"
                color="#fff"
                style={{
                  textShadowColor: "#000",
                  textShadowRadius: 2,
                  textShadowOffset: { width: 2, height: 2 },
                }}
                size={size}
              />
            )}
            label="Sign Out"
            labelStyle={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#fff",
              textShadowColor: "#000",
              textShadowRadius: 2,
              textShadowOffset: { width: 2, height: 2 },
            }}
            onPress={() => SignOut()}
          />
        </Drawer.Section>
      </ImageBackground>
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
    // paddingLeft: 20,
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
