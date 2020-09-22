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

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none" mode="modal">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="SignUpScreen1" component={SignUpScreen1} />
    <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <RootStack.Screen name="SignInPhone" component={SignInPhone} />
    <RootStack.Screen name="OTP" component={OTP} />
    <RootStack.Screen name="Modal" component={Modal} />
  </RootStack.Navigator>
);

export default RootStackScreen;
