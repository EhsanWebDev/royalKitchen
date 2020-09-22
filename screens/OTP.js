import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import CodeInput from "react-native-confirmation-code-input";
import { ActivityIndicator, withTheme } from "react-native-paper";
import { connect } from "react-redux";
import { LOGIN_URL } from "../src/helpers/constants";
import { actionTypes } from "../src/store/actions/types";
// import { Icon } from "galio-framework";
class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = { time: {}, loading: false, seconds: 30, otp: "" };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
    this.setState({
      phone: this.props.route.params.phone,
    });
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  _onFinishCheckingCode1 = async (isValid) => {
    const { phone } = this.state;
    this.setState({ loading: true });
    // console.log(isValid);

    const res = await Axios.post(
      "https://gradhatcreators.com/api/user/otp_phone",
      {
        phone,
        otp: isValid,
      }
    );

    if (!res.data.status) {
      alert("Invalid OTP");
      this.setState({ loading: false });
      return;
    } else {
      //   ({ type: "" });
      this.setState({ loading: false });
      this.props.dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        user: res.data.source,
      });
      try {
        // console.log("saving");
        await AsyncStorage.setItem(
          "userToken",
          JSON.stringify(res.data.source)
        );
      } catch (e) {
        console.log("error in signing in", e);
      }
    }

    // console.log(this.props.dispatch);
  };

  SendAgain = async () => {
    // const { username, email, errorEmail } = data;
    const { phone } = this.state;
    this.setState({ loading: true });
    //   console.log(email);
    //   setLoading(true);
    const res = await Axios.post(LOGIN_URL, {
      phone,
    });
    if (!res.data.status) {
      //   alert("Please enter registered email-address");
      console.log("error", res.data);
      this.setState({ loading: false });
      // setLoading(false);
      return;
    } else {
      //   alert("Email Sent, Please check your email-address");
      // console.log("success", res.data);
      // navigation.navigate("OTP", {
      //   phone: email,
      // });
      // setLoading(false);
      alert("Sent.. Please check your inbox");

      this.setState({
        time: {},
        seconds: 30,
        loading: false,
      });
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar }, () => {});
      this.timer = 0;
      this.startTimer();
      // setData({
      //   ...data,
      //   email: "",
      // });
    }
  };

  render() {
    const { theme } = this.props;
    const { phone, time, loading } = this.state;
    // console.log(time);
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
        style={{
          flex: 1,
          backgroundColor: "#111",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 3 }}>
          <Text
            style={{
              fontSize: 24,
              marginVertical: 20,
              fontWeight: "bold",
              color: "#fff",

              textAlign: "center",
            }}
          >
            Mobile Number Verification
          </Text>

          <View
            style={{
              borderColor: "#dddddd",
              borderWidth: 0.5,
              //   width: "80%",
              alignSelf: "center",
              borderRadius: 8,
              //   padding: 14,
              paddingVertical: 24,
              flexDirection: "row",
              //   justifyContent: "space-between",
              //   alignItems: "center",
            }}
          >
            {/* <Icon
              name="smartphone"
              family="Feather"
              size={48}
              color="#6C43B4"
            /> */}
            <Text
              style={{
                color: "#777",
                fontWeight: "bold",
                paddingHorizontal: 18,
                fontSize: 14,
                // flex: 1,
                // flexWrap: "wrap",
              }}
            >
              enter the 4-digit code sent to {phone && phone}
            </Text>
          </View>

          <CodeInput
            ref="codeInputRef2"
            codeLength={4}
            // compareWithCode="AsDW"
            keyboardType="number-pad"
            activeColor="#AFA6A1"
            inactiveColor="#AFA6A1"
            autoFocus={true}
            // ignoreCase={true}
            // inputPosition="center"
            size={50}
            onFulfill={(isValid) => this._onFinishCheckingCode1(isValid)}
            containerStyle={{ marginTop: 40 }}
            codeInputStyle={{
              borderColor: "#dddddd",
              borderWidth: 2,
              color: "white",
              fontSize: 24,
              borderRadius: 5,
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignSelf: "center",
            marginBottom: 20,
          }}
          disabled={this.state.time.s === 0 ? false : true}
          onPress={() => this.SendAgain()}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              borderBottomColor: this.state.time.s === 0 ? "#fff" : "#777",
              borderBottomWidth: 2,
              color: this.state.time.s === 0 ? "#fff" : "#777",
            }}
          >
            Send again in {this.state.time.s} Seconds
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 0, marginBottom: 40 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#7220D1",
              flexDirection: "row",
              justifyContent: "center",
              paddingVertical: 13,
              width: "60%",
              alignSelf: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "right",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Continue
            </Text>
            {/* <Icon
              style={{ paddingLeft: 30 }}
              name="arrowright"
              family="AntDesign"
              color="white"
              size={20}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(null, mapDispatchToProps)(withTheme(OTP));
