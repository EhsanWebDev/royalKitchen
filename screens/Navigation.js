import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

//Navigation
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  ActivityIndicator,
} from "react-native-paper";

import RootStackScreen from "./RootStackScreen";
import MainTabScreen from "./MainTabScreen";
import SupportScreen from "./SupportScreen";
import SettingsScreen from "./SettingsScreen";
import BookmarkScreen from "./BookmarkScreen";
import DrawerContent from "./DrawerContent";
import { AuthContext } from "../components/context";
import AsyncStorage from "@react-native-community/async-storage";

const Drawer = createDrawerNavigator();

const Navigation = ({ user, dispatch }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // console.log(user);
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      // console.log("user token: ", userToken);
      dispatch({ type: "RETRIEVE_TOKEN", user: JSON.parse(userToken) });
      setLoading(false);
    }, 500);
  }, []);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#c23616",
      text: "#fff",
      dark: "#000",
      primary: "#c23616",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const authContext = React.useMemo(
    () => ({
      // signIn: async foundUser => {
      //   // setUserToken('fgkj');
      //   // setIsLoading(false);
      //   const userToken = String(foundUser[0].userToken);
      //   const userName = foundUser[0].username;

      //   try {
      //     await AsyncStorage.setItem('userToken', userToken);
      //   } catch (e) {
      //     console.log(e);
      //   }
      //   console.log('user token: ', userToken);
      //   dispatch({type: 'LOGIN', id: userName, token: userToken});
      //   dispatch({type: 'LOGIN_SUCCESS', user: userToken, isLoading: false});
      // },
      // signOut: async () => {
      //   // setUserToken(null);
      //   // setIsLoading(false);
      //   try {
      //     await AsyncStorage.removeItem('userToken');
      //   } catch (e) {
      //     console.log(e);
      //   }
      //   dispatch({type: 'LOGOUT'});
      // },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    []
  );
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {user !== null ? (
            <Drawer.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}
            >
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
