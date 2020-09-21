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
import Axios from "axios";
const ForgotPassword = ({ navigation }) => {
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

  const Continue = async () => {
    const { username, email, errorEmail } = data;
    if (email.length === 0 || errorEmail) {
      alert("Please enter email");
    } else {
      const res = await Axios.post(
        "https://gradhatcreators.com/api/user/forgot_password",
        {
          email,
        }
      );
      if (!res.data.status) {
        alert("Please enter registered email-address");
        return;
      } else {
        alert("Email Sent, Please check your email-address");
        setData({
          ...data,
          email: "",
        });
      }
    }
  };

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
      <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
      <ImageBackground
        style={styles.bg_img}
        source={{
          uri:
            "https://images.pexels.com/photos/3212810/pexels-photo-3212810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        }}
      >
        <Text style={styles.text_header}>Forgot password</Text>
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
              name="email-outline"
              color={theme.dark ? "#333" : "#333"}
              size={26}
              style={{
                backgroundColor: "#fff",
                paddingVertical: 10,
                paddingHorizontal: 5,
                borderRightColor: "#fff",
              }}
            />
            <TextInput
              placeholder="Enter your Email Address"
              placeholderTextColor="#333"
              style={[
                styles.textInput,
                {
                  color: theme.dark ? "#333" : "#333",
                  fontSize: 18,
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
          {data.errorEmail && (
            <Text style={{ color: "#e1b12c", fontWeight: "bold" }}>
              {data.errorEmail}
            </Text>
          )}

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
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

export default ForgotPassword;

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
