import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons, Ionicons as Icon } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import NotificationScreen from "./NotificationScreen";
// import ExploreScreen from './ExploreScreen';
import ProfileScreen from "./ProfileScreen";
// import MapTestScreen from './MapTestScreen';
// import EditProfileScreen from './EditProfileScreen';

import { useTheme, Avatar } from "react-native-paper";
import { View } from "react-native-animatable";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import CardListScreen from "./CardListScreen";
// import CardItemDetails from "./CardItemDetails";
import { StyleSheet, Platform, Text } from "react-native";
import Cart from "./Cart/Cart";
import CartIcon from "./Cart/CartIcon";
import Categories from "./Categories/Categories";
import ConfirmDelivery from "./ConfirmDelivery/ConfirmDelivery";
import Address from "./Address/Address";
import CreateAdd from "./Address/CreateAdd";
import PlaceOrder from "./ConfirmDelivery/PlaceOrder";
import SubCategory from "../components/SubCategory";
import OrderHistory from "./Orders/OrderHistory";
import Products from "./Orders/Products";
import EditAddress from "./Address/EditAddress";
import CurrentOrders from "./Orders/CurrentOrders";
import OrderSuccess from "./ConfirmDelivery/OrderSuccess";
import ContactUs from "./Static/ContactUs";
import Payment from "./ConfirmDelivery/Payment";
import CardPay from "./ConfirmDelivery/CardPay";
import Wallet from "./ConfirmDelivery/Wallet";
import Rewards from "./Rewards";

const HomeStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const { colors } = useTheme();
  const theme = useTheme();
  return (
    <Tab.Navigator initialRouteName="Home" labeled={false} activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarColor: "#c23616",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryStackScreen}
        options={({ route }) => ({
          tabBarLabel: "Categories",
          tabBarColor: "#1B1464",
          // tabBarVisible: false,
          tabBarIcon: ({ color }) => (
            <Icon name="md-grid" color={color} size={28} />
          ),
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: "Updates",
          tabBarColor: "#1f65ff",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="contact-phone"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: colors.dark,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({color}) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    /> */}
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 10, // Android
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          height: 70,
        },
        // headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Royal Kitchen",
          headerLeft: () => (
            <View style={{ paddingLeft: 20 }}>
              <Icon.Button
                name="ios-menu"
                // style={{bordebott: 120}}
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <CartIcon dark={theme.dark ? true : false} color="#fff" />
          ),
        }}
      />
      {/* <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
        })}
      /> */}

      <HomeStack.Screen name="Cart" component={Cart} />
      <HomeStack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Address"
        component={Address}
      />

      <HomeStack.Screen
        name="SubCat"
        options={{ headerShown: false }}
        component={SubCategory}
      />
      <HomeStack.Screen name="PlaceOrder" component={PlaceOrder} />
      <HomeStack.Screen name="OrderSuccess" component={OrderSuccess} />
      <HomeStack.Screen name="Payment" component={Payment} />
      <HomeStack.Screen name="CardPay" component={CardPay} />
      <HomeStack.Screen
        name="ContactUs"
        options={{ title: "Contact Us" }}
        component={ContactUs}
      />

      <HomeStack.Screen
        name="CreateAdd"
        options={{ headerShown: false }}
        component={CreateAdd}
      />
      <HomeStack.Screen
        name="EditAddress"
        options={{ headerShown: false }}
        component={EditAddress}
      />
    </HomeStack.Navigator>
  );
};
const CategoryStackScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  return (
    <CategoryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 10, // Android
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          height: 70,
        },
        // headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <CategoryStack.Screen
        name="CategoryScreen"
        options={{ headerShown: false }}
        component={Categories}
      />
      <CategoryStack.Screen name="Cart" component={Cart} />
      <CategoryStack.Screen
        options={{ headerShown: false }}
        name="Address"
        component={Address}
      />
      <CategoryStack.Screen
        name="CreateAdd"
        options={{ headerShown: false }}
        component={CreateAdd}
      />

      <CategoryStack.Screen
        options={{ headerShown: false }}
        name="EditAddress"
        component={EditAddress}
      />
      <CategoryStack.Screen
        name="ConfirmDelivery"
        component={ConfirmDelivery}
      />
      <CategoryStack.Screen name="PlaceOrder" component={PlaceOrder} />
      <CategoryStack.Screen name="OrderSuccess" component={OrderSuccess} />
      <CategoryStack.Screen name="Payment" component={Payment} />

      <CategoryStack.Screen name="CardPay" component={CardPay} />
      <CategoryStack.Screen name="Wallet" component={Wallet} />
    </CategoryStack.Navigator>
  );
};
const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#c0392b",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <NotificationStack.Screen
      name="Notifications"
      component={ContactUs}
      options={{
        title: "Contact Us",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#c0392b"
            onPress={() => navigation.openDrawer()}
          />
        ),
      }}
    />
  </NotificationStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "",
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate("EditProfile")}
              />
            </View>
          ),
        }}
      />
      {/* <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
        }}
        component={EditProfileScreen}
      /> */}
      <ProfileStack.Screen name="Address" component={Address} />
      <ProfileStack.Screen name="CreateAdd" component={CreateAdd} />
      <ProfileStack.Screen name="EditAddress" component={EditAddress} />
      <ProfileStack.Screen name="OrderHistory" component={OrderHistory} />
      <ProfileStack.Screen name="CurrentOrders" component={CurrentOrders} />
      <ProfileStack.Screen name="Products" component={Products} />

      <ProfileStack.Screen name="ConfirmDelivery" component={ConfirmDelivery} />
      <ProfileStack.Screen name="PlaceOrder" component={PlaceOrder} />
      <ProfileStack.Screen name="OrderSuccess" component={OrderSuccess} />
      <ProfileStack.Screen name="Payment" component={Payment} />

      <ProfileStack.Screen name="CardPay" component={CardPay} />
      <ProfileStack.Screen name="Rewards" component={Rewards} />
    </ProfileStack.Navigator>
  );
};

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
