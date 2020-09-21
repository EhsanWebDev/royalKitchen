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

import { FontAwesome, Feather } from "@expo/vector-icons";
import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import {
  Button,
  Modal,
  Portal,
  useTheme,
  Provider,
  ActivityIndicator,
} from "react-native-paper";
import { AuthContext } from "../components/context";
import { connect } from "react-redux";
import { loginUser } from "../src/store/actions/auth";
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
    passwordError: false,
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [loading, setLoading] = React.useState(false);
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
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
        passwordError: false,
      });
    } else {
      setData({
        ...data,
        passwordError: "Please enter password",
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
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
  // const handleGoogleAuth = async () => {
  //   setLoading(true);
  //   onGoogleButtonPress()
  //     .then(res => {
  //       const user = res.user._user.providerData[0];
  //       console.log('res', user);
  //       setLoading(false);
  //       if (!user.phone) {
  //         navigation.navigate('Modal', {user});
  //       }
  //     })
  //     .catch(e => alert('Error occurred while signing in '));
  // };
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
    // attempt();
    // initAsync();
  }, []);
  const loginHandle = async () => {
    // console.log(number);
    // console.log(user);
    setLoading(true);
    const { mobile, mobileError, password, passwordError } = data;
    const payload = {
      phone: mobile,
      password,
    };
    if (
      mobileError ||
      passwordError ||
      mobile.length === 0 ||
      password.length === 0
    ) {
      alert("Please provide valid credentials");
      setLoading(false);
      return;
    } else {
      const res = await dispatch(loginUser(payload));
      if (res.data.status) {
        // console.log('User', user);
        setLoading(false);
        // const token = makeid(5);
        // console.log(token);
        // const userData = [
        //   {
        //     ...user,
        //     userToken: user,
        //   },
        // ];
        // console.log(userData);
        // await signIn(userData);
      } else {
        setLoading(false);
        alert("Incorrect Credentials");
      }
      // if (user) {
      //   console.log('User', user);
      //   setLoading(false);
      //   const token = makeid(5);
      //   // console.log(token);
      //   const userData = [
      //     {
      //       ...user,
      //       userToken: token,
      //     },
      //   ];
      //   // console.log(userData);
      //   await signIn(userData);
      //   return;
      // }

      // setLoading(false);
      // alert('Incorrect Credentials');

      // console.log('user', user);
    }

    // const foundUser = Users.filter(item => {
    //   return number == item.phone;
    // });

    // if (data.username.length == 0) {
    //   Alert.alert(
    //     'Wrong Input!',
    //     'Username or password field cannot be empty.',
    //     [{text: 'Okay'}],
    //   );
    //   return;
    // }

    // if (foundUser.length == 0) {
    //   Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //     {text: 'Okay'},
    //   ]);
    //   return;
    // }
  };
  // if (loading) {
  //   return (
  //     <View
  //       style={{flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.dark ? "#333" : "#fff" },
      ]}
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
      <ImageBackground
        style={styles.bg_img}
        source={{
          uri:
            "https://images.pexels.com/photos/3212810/pexels-photo-3212810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
      >
        {/* <StatusBar backgroundColor="#FF5763" barStyle="light-content" /> */}
        <View style={styles.header}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 120,
              height: 120,
              borderRadius: 20,
            }}
          />
          <Text style={styles.text_header}>Good Food Never Wait!</Text>
          {user && <Text style={{ color: "white" }}>Welcome {user.fname}</Text>}
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={500}
          style={[
            styles.footer,
            {
              backgroundColor: "rgba(0,0,0,0.5)",
            },
          ]}
        >
          {/* <Text
            style={[
              styles.text_footer,
              {
                color: theme.dark ? '#fff' : '#fff',
                fontSize: 32,
                fontWeight: 'bold',
              },
            ]}>
            Phone Login
          </Text> */}
          <KeyboardAvoidingView
            // keyboardVerticalOffset={-120}
            behavior="height"
            style={styles.action}
          >
            <FontAwesome
              name="mobile-phone"
              color={theme.dark ? "#333" : "#333"}
              size={28}
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRightColor: "#fff",
              }}
            />
            <TextInput
              placeholder="Enter your mobile number"
              placeholderTextColor="#333"
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#333",
                  fontSize: 18,
                },
              ]}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={28}
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRightColor: "#fff",
                  }}
                />
              </Animatable.View>
            ) : null}
          </KeyboardAvoidingView>

          {/* {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Mobile number must be 4 characters long.
            </Text>
          </Animatable.View>
        )} */}

          {/* <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          Password
        </Text> */}
          <View style={styles.action}>
            <Feather
              name="lock"
              color={theme.dark ? "#333" : "#333"}
              size={28}
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRightColor: "#fff",
              }}
            />
            <TextInput
              placeholder="Enter Your Password"
              placeholderTextColor="#333"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#333",
                  fontSize: 18,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather
                  name="eye-off"
                  color="grey"
                  size={28}
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRightColor: "#fff",
                  }}
                />
              ) : (
                <Feather
                  name="eye"
                  color="grey"
                  size={28}
                  style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRightColor: "#fff",
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          {/* {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )} */}

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                color: "#fff",
                marginTop: 25,
                textAlign: "center",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
            <Text
              style={{
                color: "#e84118",
                marginTop: 25,
                textAlign: "center",
                fontSize: 20,
                // fontWeight: 'bold',
              }}
            >
              Sign Up !
            </Text>
          </TouchableOpacity>
          <View style={styles.button}>
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

            <TouchableOpacity
              onPress={() => attempt()}
              style={[
                styles.signIn,
                {
                  marginTop: 15,
                  // paddingHorizontal: 20,
                  borderWidth: 1,
                  borderColor: "#fff",
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                {/* <FontAwesome
                name="google"
                color="black"
                size={18}
                style={{marginRight: 10}}
              /> */}
                Sign in using Google
              </Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
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

    resizeMode: "cover",
    // alignItems: 'center',
    opacity: 0.93,
    // paddingTop: 20,
    // paddingHorizontal: 20,
    // backgroundColor: 'rgba(0,0,0,.9)',
  },
  header: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: 'flex-end',
    // paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  footer: {
    flex: 2,
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
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
    marginBottom: 10,
  },
  signIn: {
    width: "100%",
    height: 40,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 40,
  },
  textSign: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
