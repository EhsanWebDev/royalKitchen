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
import { ActivityIndicator, useTheme } from "react-native-paper";
import Axios from "axios";
import { LOGIN_URL } from "../src/helpers/constants";
const SignInPhone = ({ navigation }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
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

  const textInputChangeEmail = (val) => {
    // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (val) {
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

  const Continue = async () => {
    const { username, email, errorEmail } = data;
    if (email.length <= 0 || email.length < 6) {
      alert("Please enter valid mobile number");
    } else {
      console.log(email);
      setLoading(true);
      const res = await Axios.post(LOGIN_URL, {
        phone: email,
      });
      if (!res.data.status) {
        //   alert("Please enter registered email-address");
        console.log("error", res.data);
        setLoading(false);
        return;
      } else {
        //   alert("Email Sent, Please check your email-address");
        // console.log("success", res.data);
        navigation.navigate("OTP", {
          phone: email,
        });
        setLoading(false);
        setData({
          ...data,
          email: "",
        });
      }
    }
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#111",
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
        {
          backgroundColor: theme.dark ? "#333" : "#fff",
          justifyContent: "center",
        },
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
        <Text style={styles.text_header}>Login Using Phone Number</Text>
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
          <KeyboardAvoidingView
            // keyboardVerticalOffset={20}
            behavior="padding"
            style={styles.action}
          >
            <MaterialCommunityIcons
              name="phone"
              color={theme.dark ? "#333" : "#fff"}
              size={24}
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                padding: 15,
                borderRadius: 15,

                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <TextInput
              placeholder="Enter your Mobile Number"
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
              keyboardType="number-pad"
              onChangeText={(val) => textInputChangeEmail(val)}
              //   onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </KeyboardAvoidingView>

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
                  Send OTP Code
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

export default SignInPhone;

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
    justifyContent: "center",
    marginTop: 20,
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
    paddingTop: 60,
    fontSize: 26,
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
