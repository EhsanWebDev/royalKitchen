import React, { useEffect } from "react";
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

import { Feather } from "@expo/vector-icons";
import { Button, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { createUser } from "../src/store/actions/auth";

import { AuthContext } from "../components/context";
const SignUpScreen1 = ({ navigation, route, user, dispatch, error }) => {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const { email, username, mobileNumber } = route.params.data;

    setData({
      ...data,
      email,
      username,
      mobileNumber,
    });
  }, []);
  const { colors } = useTheme();
  const theme = useTheme();
  const { signIn } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    password: "",
    passwordError: "Please Enter your password",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const handlePasswordChange = (val) => {
    if (val.length >= 6) {
      setData({
        ...data,
        password: val,
        passwordError: false,
      });
    } else {
      setData({
        ...data,
        passwordError: "Password must be 6 at least characters ",
      });
    }
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const signUpHandle = async () => {
    setLoading(true);
    const {
      password,
      username,
      email,
      mobileNumber,
      confirm_password,
      passwordError,
    } = data;
    console.log("password", password);
    if (passwordError) {
      alert(passwordError);
    } else if (password !== confirm_password) {
      alert("Passwords don't match. Please try again");
    } else {
      // console.log(email, username, mobileNumber, password);
      const payload = {
        phone: mobileNumber,
        fname: username,
        email,
        password,
      };

      const res = await dispatch(createUser(payload));
      // console.log('res', res);
      if (res.status) {
        setLoading(false);
        // console.log('User', user);
        // setLoading(false);
        // const token = makeid(5);
        // // console.log(token);
        // const userData = [
        //   {
        //     ...user,
        //     userToken: token,
        //   },
        // ];
        // // console.log(userData);
        // signIn(userData);
      } else {
        setLoading(false);
        alert(res.message);
      }
      // console.log('user', user);
      // if (user) {
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
      //   signIn(userData);
      // }
      // if (error) {
      //   setLoading(false);
      //   alert('Error Occurred');
      // }
    }
  };

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
        <Text style={styles.text_header}>Sign Up</Text>
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
              placeholder="Re-Enter Your Password"
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
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {/* {data.confirm_secureTextEntry ? (
                <Feather
                  name="eye-off"
                  color="grey"
                  size={28}
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRightColor: '#fff',
                  }}
                />
              ) : (
                <Feather
                  name="eye"
                  color="grey"
                  size={28}
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRightColor: '#fff',
                  }}
                />
              )} */}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <Button
              mode="contained"
              loading={loading}
              style={[
                styles.signIn,
                {
                  backgroundColor: "#FF5763",
                },
              ]}
              onPress={() => {
                signUpHandle();
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
                Sign Up
              </Text>
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignInScreen")}
            >
              <Text
                style={{
                  color: "#fff",
                  marginTop: 15,
                  textAlign: "center",
                  fontSize: 20,
                  // fontWeight: 'bold',
                }}
              >
                Already have an account ? Sign In !
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen1);

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
    paddingTop: 20,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
