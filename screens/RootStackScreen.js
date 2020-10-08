import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import SignUpScreen1 from "./SignUpScreen1";
import Modal from "./Modal/Modal";
import ForgotPassword from "./ForgotPassword";
import SignInPhone from "./SignInPhone";
import OTP from "./OTP";
import Terms from "./Static/Terms";
import { useTheme } from "react-native-paper";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <RootStack.Navigator
      mode="modal"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 10, // Android
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          height: 85,
        },
        // headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <RootStack.Screen
        name="SplashScreen"
        options={{ headerShown: false }}
        component={SplashScreen}
      />
      <RootStack.Screen
        name="SignInScreen"
        options={{ headerShown: false }}
        component={SignInScreen}
      />
      <RootStack.Screen
        name="SignUpScreen"
        options={{ headerShown: false }}
        component={SignUpScreen}
      />
      <RootStack.Screen
        name="SignUpScreen1"
        options={{ headerShown: false }}
        component={SignUpScreen1}
      />
      <RootStack.Screen
        name="ForgotPassword"
        options={{ headerShown: false }}
        component={ForgotPassword}
      />
      <RootStack.Screen
        name="SignInPhone"
        options={{ headerShown: false }}
        component={SignInPhone}
      />
      <RootStack.Screen
        name="OTP"
        options={{ headerShown: false }}
        component={OTP}
      />
      <RootStack.Screen
        name="Modal"
        options={{ headerShown: false }}
        component={Modal}
      />
      <RootStack.Screen
        name="TermsNConditions"
        options={{ title: "Terms & conditions" }}
        component={Terms}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
