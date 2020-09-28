import React from "react";
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
import { LinearGradient } from "expo-linear-gradient";

import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { connect } from "react-redux";
const SignUpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [data, setData] = React.useState({
    username: "",
    mobileNumber: "",
    email: "",
    errorEmail: false,
    errorMobile: false,
    check_textInputChange: false,
    check_textInputChangeMobile: false,
    check_textInputChangeEmail: false,
  });

  const textInputChangeUser = (val) => {
    if (val.length !== 0 && val.length >= 3) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };
  const textInputChangeMobile = (val) => {
    if (!isNaN(val) && val.length >= 3) {
      setData({
        ...data,
        mobileNumber: val,
        errorMobile: false,
        check_textInputChangeMobile: true,
      });
    } else {
      setData({
        ...data,
        errorMobile: "Please enter a valid phone number",
        check_textInputChangeMobile: false,
      });
    }
  };
  const textInputChangeEmail = (val) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(val).toLowerCase())) {
      setData({
        ...data,
        email: val,
        errorEmail: false,
        check_textInputChangeEmail: true,
      });
    } else {
      setData({
        ...data,
        errorEmail: "Please enter a valid email-address",
        check_textInputChangeEmail: false,
      });
    }
  };

  const Continue = () => {
    const { username, email, mobileNumber, errorEmail, errorMobile } = data;
    if (
      username.length === 0 ||
      email.length === 0 ||
      mobileNumber.length === 0 ||
      errorMobile ||
      errorEmail
    ) {
      alert("Some fields are missing");
    } else {
      navigation.navigate("SignUpScreen1", {
        data: data,
      });
    }
  };
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
      <StatusBar
        translucent
        backgroundColor="transparent"
        // backgroundColor="rgba(0,0,0,.8)"
        barStyle="light-content"
      />
      <ImageBackground
        style={styles.bg_img}
        blurRadius={1}
        source={{
          uri:
            "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=653&q=80",
        }}
      >
        <Text style={styles.text_header}>Create a new account</Text>
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
          <KeyboardAvoidingView behavior="padding" style={styles.action}>
            <FontAwesome
              name="user-o"
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
              placeholder="Enter your Full Name"
              placeholderTextColor="#fff"
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#fff",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  fontSize: 16,
                  // borderRadius: data.check_textInputChange ? 0 : 15,
                  borderRadius: 15,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChangeUser(val)}
              //   onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {/* {data.check_textInputChange ? (
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
            ) : null} */}
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            // keyboardVerticalOffset={-120}
            behavior="height"
            style={styles.action}
          >
            <Feather
              name="smartphone"
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
              placeholder="Enter your mobile number"
              placeholderTextColor="#fff"
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#fff",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  fontSize: 16,
                  borderRadius: data.check_textInputChangeMobile ? 0 : 15,
                  // borderRadius: 15,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(val) => textInputChangeMobile(val)}
              //   onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChangeMobile ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
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
              </Animatable.View>
            ) : null}
          </KeyboardAvoidingView>
          {data.errorMobile && (
            <Text style={{ color: "#e1b12c", fontWeight: "bold" }}>
              {data.errorMobile}
            </Text>
          )}
          <KeyboardAvoidingView
            // keyboardVerticalOffset={20}
            behavior="padding"
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
              placeholder="Enter your Email Address"
              placeholderTextColor="#fff"
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#fff",
                  backgroundColor: "rgba(255,255,255,0.3)",
                  fontSize: 16,
                  borderRadius: data.check_textInputChangeEmail ? 0 : 15,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(val) => textInputChangeEmail(val)}
              //   onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChangeEmail ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
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
              </Animatable.View>
            ) : null}
          </KeyboardAvoidingView>
          {data.errorEmail && (
            <Text style={{ color: "#e1b12c", fontWeight: "bold" }}>
              {data.errorEmail}
            </Text>
          )}

          <View style={styles.action}>
            <Feather
              name="lock"
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
              onChangeText={(val) => handlePasswordChange(val)}
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
          </View>
          {/* <View style={styles.action}>
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
            
            </TouchableOpacity>
          </View> */}

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={() => Continue()}>
              <LinearGradient
                colors={["#FF5763", "#FF5763"]}
                style={styles.signIn}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Continue
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

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
    // flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: 'flex-end',
    // paddingHorizontal: 20,
    // paddingBottom: 50,
  },
  footer: {
    flex: 1,
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
    paddingTop: 30,
    fontSize: 28,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
