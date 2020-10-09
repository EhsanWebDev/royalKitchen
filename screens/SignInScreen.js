import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";

import {
  FontAwesome,
  AntDesign,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import {
  Button,
  Modal,
  Portal,
  useTheme,
  Provider,
  ActivityIndicator,
  Title,
} from "react-native-paper";
import { AuthContext } from "../components/context";
import { connect } from "react-redux";
import { loginUser } from "../src/store/actions/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-community/async-storage";
// import {makeid} from '../src/helpers/constants';
// import {GoogleSignin} from '@react-native-community/google-signin';
// import auth from '@react-native-firebase/auth';

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
//   webClientId:
//     '706778063952-db4rmbp2susq9ftohdl7m4s2ps30d3um.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
// });
const SignInScreen = ({ navigation, dispatch, user, error }) => {
  const [data, setData] = React.useState({
    mobile: "",
    mobileError: false,
    password: "",
    email: "",
    errorEmail: false,
    passwordError: false,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [loading, setLoading] = React.useState(true);
  const [googleUser, setGoogleUser] = useState();
  const { colors } = useTheme();
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);

  const hideModal = () => setVisible(false);
  const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (!isNaN(val) && val.length >= 10) {
      setData({
        ...data,
        mobile: val,
        check_textInputChange: true,
        isValidUser: true,
        mobileError: false,
      });
    } else {
      setData({
        ...data,
        // username: val,
        mobileError: "Please enter valid mobile number",
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    // if (val) {
    setData({
      ...data,
      password: val,
      isValidPassword: true,
      passwordError: false,
    });
    // } else {
    //   setData({
    //     ...data,
    //     password: val,
    //     passwordError: "Please enter password",
    //     isValidPassword: false,
    //   });
    // }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const textInputChangeEmail = (val) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(val).toLowerCase())) {
      setData({
        ...data,
        email: val,
        errorEmail: false,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        errorEmail: "Please enter a valid email-address",
        check_textInputChangeEmail: false,
        check_textInputChange: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 10) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const attempt = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: `706778063952-v9031e7idlub8vebv34m3htamumqr0i5.apps.googleusercontent.com`,
      androidClientId: `706778063952-98jo45uaieid42mem4sucmb9nre353ru.apps.googleusercontent.com`,
      iosStandaloneAppClientId: `706778063952-v9031e7idlub8vebv34m3htamumqr0i5.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `706778063952-98jo45uaieid42mem4sucmb9nre353ru.apps.googleusercontent.com`,
      scopes: [""],
    });
    if (type === "success") {
      /* `accessToken` is now valid and can be used to get data from the Google API with HTTP requests */
      navigation.navigate("Modal", { user });
    }
  };

  useEffect(() => {
     const fetchData = async () => {
        let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (e) {
        console.log(e);
      }
      console.log("user token: ", userToken);
      dispatch({ type: "RETRIEVE_TOKEN", user: JSON.parse(userToken) });
      if (userToken || user) {
        navigation.navigate('homepage')
        setLoading(false)
      } else {
         setLoading(false);
      }
     
     }
    fetchData()
  }, []);
  const loginHandle = async () => {
    // console.log(number);
    // console.log(user);
    setLoading(true);
    const {
      mobile,
      email,
      errorEmail,
      mobileError,
      password,
      passwordError,
    } = data;
    const payload = {
      email,
      password,
    };
    if (
      passwordError ||
      errorEmail ||
      email.length === 0 ||
      password.length === 0
    ) {
      alert("Please provide valid credentials");
      setLoading(false);
      return;
    } else {
      const res = await dispatch(loginUser(payload));
      if (res.data.status) {
        setLoading(false);
      } else {
        setLoading(false);
        setData({
          ...data,
          email: "",
          password: "",
          check_textInputChange: false,
        });
        alert("Email / Password Incorrect, Or Not Registered");
      }
    }
  };
  // if (loading) {
  //   return (
  //     <View
  //       style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
   if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#333",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.dark ? "#333" : "#fff" },
      ]}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        // backgroundColor="rgba(0,0,0,.8)"
        barStyle="light-content"
      />
      <ImageBackground
        blurRadius={1}
        style={styles.bg_img}
        source={{
          uri:
            "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80",
        }}
      >
         
        {/* <StatusBar backgroundColor="#FF5763" barStyle="light-content" /> */}
        <View style={styles.header}>
          {/* <Image
            source={require("../assets/logo.png")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
            }}
          /> */}
          <Text style={styles.text_header}>Royal Kitchen</Text>
        </View>
        <View
          style={[
            styles.footer,
            {
              backgroundColor: "rgba(0,0,0,.5)",
            },
          ]}
        >
          <KeyboardAvoidingView
            // keyboardVerticalOffset={-120}
            behavior="height"
            style={styles.action}
          >
            <MaterialCommunityIcons
              name="email-outline"
              color={theme.dark ? "#333" : "#fff"}
              size={24}
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 15,
                // borderRightColor: "#fff",
                borderRadius: 15,

                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#fff"
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#fff",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  fontSize: 16,
                  borderRadius: data.check_textInputChange ? 0 : 15,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(val) => setData({ ...data, email: val })}
              value={data.email}
              // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="white"
                  size={24}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    padding: 15,
                    // borderRightColor: "#fff",
                    borderRadius: 15,

                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                />
              </Animatable.View>
            ) : null}
          </KeyboardAvoidingView>

          <KeyboardAvoidingView
            style={styles.action}
            behavior="height"
            keyboardVerticalOffset={-550}
          >
            <MaterialCommunityIcons
              name="lock-outline"
              color={theme.dark ? "#333" : "#fff"}
              size={24}
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 15,
                // borderRightColor: "#fff",
                borderRadius: 15,

                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <TextInput
              placeholder="Enter Your Password"
              value={data.password}
              placeholderTextColor="#fff"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#fff",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  fontSize: 16,
                  // borderRadius: 15,
                  // borderTopRightRadius: 0,
                  // borderBottomRightRadius: 0,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => setData({ ...data, password: val })}
            />

            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather
                  name="eye-off"
                  color="#fff"
                  size={24}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    padding: 15,
                    // borderRightColor: "#fff",
                    borderRadius: 15,

                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                />
              ) : (
                <Feather
                  name="eye"
                  color="#fff"
                  size={24}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    padding: 15,
                    // borderRightColor: "#fff",
                    borderRadius: 15,

                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                />
              )}
            </TouchableOpacity>
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                color: "#fff",
                marginTop: 15,
                textAlign: "right",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={{ height: 80 }} />
          <KeyboardAvoidingView style={styles.button}>
            <Button
              loading={loading}
              mode="contained"
              style={[
                styles.signIn,
                {
                  backgroundColor: "#FF5763",
                },
              ]}
              onPress={() => {
                loginHandle(data.username);
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </Button>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginRight: 20,
                  fontStyle: "italic",
                }}
              >
                Sign in using
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignInPhone")}
                style={{
                  backgroundColor: "#FF5763",
                  marginHorizontal: 10,
                  borderRadius: 20,
                  padding: 5,
                }}
                // style={[
                //   styles.signIn,
                //   {
                //     marginTop: 15,
                //     // paddingHorizontal: 20,
                //     borderWidth: 1,
                //     borderColor: "#fff",
                //   },
                // ]}
              >
                {/* <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                  // borderColor: "#000",
                  // borderWidth: 0,
                  // border,
                },
              ]}
            >
            
              
              Sign In using Phone Number
            </Text> */}
                <Feather name="smartphone" color="#fff" size={22} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => attempt()}
                style={{
                  backgroundColor: "#FF5763",
                  marginHorizontal: 10,
                  borderRadius: 20,
                  padding: 5,
                }}
                // style={[
                //   styles.signIn,
                //   {
                //     marginTop: 15,
                //     // paddingHorizontal: 20,
                //     borderWidth: 1,
                //     borderColor: "#fff",
                //   },
                // ]}
              >
                {/* <Text
              style={[
                styles.textSign,
                {
                  color: "#fff",
                  // borderColor: "#000",
                  // borderWidth: 0,
                  // border,
                },
              ]}
            >
            
              
              Sign In using Phone Number
            </Text> */}
                <AntDesign name="google" color="#fff" size={22} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
              style={{ paddingBottom: 5 }}
            >
              <Text
                style={{
                  color: "#fff",
                  // marginTop: 5,
                  textAlign: "center",
                  fontSize: 18,
                  borderBottomColor: "#fff",
                  borderBottomWidth: 3,
                  // paddingBottom: 5,
                  // fontWeight: "bold",
                }}
              >
                Create new account
              </Text>
            </TouchableOpacity>
            <Button mode="contained"
            // style={[styles.signIn]}
            style={{
              justifyContent: "flex-start",
              width: "90%",
              backgroundColor: "#0097e6",
              alignItems: "center",
            }}
            contentStyle={{
              alignSelf: "flex-start",
              justifyContent: "flex-start",
            }}
            // labelStyle={{ color: "#0097e6" }}
            icon="arrow-right"
            onPress={() => navigation.navigate('homepage')}
          >
            <Text
              style={[
                styles.textSign,
               
              ]}
            >
              Skip Login
            </Text>
          </Button>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    </View>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FF5763',
  },
  bg_img: {
    flex: 1,

    // resizeMode: "cover",

    // alignItems: 'center',
    opacity: 0.85,
    // paddingTop: 20,
    // paddingHorizontal: 20,
    // backgroundColor: 'rgba(0,0,0,.9)',
  },
  header: {
    flex: 1,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: 'flex-end',
    // paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  footer: {
    flex: 3,
    // marginTop: 30,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    // backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
    // paddingVertical: -10,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 36,
    paddingTop: 120,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    borderRadius: 10,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,

    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: "#333",
    backgroundColor: "#fff",
    // borderBottomColor: '#6667',
    // borderBottomWidth: 2,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    // marginTop: 10,
    paddingTop: 60,
  },
  signIn: {
    width: "90%",
    // height: 40,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textSign: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
