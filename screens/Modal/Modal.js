import Axios from "axios";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { connect } from "react-redux";
import { createUser, loginUser } from "../../src/store/actions/auth";

// import { Container } from './styles';

const Modal = ({ navigation, route, user, dispatch }) => {
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [phone, setPhone] = useState("");
  const [userGoogle, setGoogleUser] = useState(null);

  useEffect(() => {
    setGoogleUser(route.params.user);
  }, []);
  const handleSubmit = async () => {
    if (phone.length === 0) {
      alert("Please enter phone number");
      return;
    } else if (phone.length < 9) {
      alert("Please enter valid phone number");
      return;
    }
    const res = await dispatch(loginUser({ phone, password: "null" }));
    console.log("Res", res.data);
    // if (!res.data.status) {
    // const otp = await Axios.post(
    //   "https://gradhatcreators.com/api/user/otp_phone",
    //   {
    //     phone: phone,
    //   }
    // );

    // console.log(otp.data);
    // }
    if (!res.data.status && res.data.title === "Phone number not found") {
      const payload = {
        email: userGoogle.email,
        phone: phone,
        password: "null",
        fname: userGoogle.name,
      };
      console.log(payload);
      const signUp = await dispatch(createUser(payload));
      console.log("Sign Up", signUp);
      if (signUp.data.title === "Phone Number Already Exist") {
        alert("Please enter registered phone number.");
        return;
      }
      //   console.log(signUp);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: 'center',
        paddingTop: 20,
      }}
    >
      <Text style={{ fontSize: 30, textAlign: "center", color: "#000" }}>
        Welcome {userGoogle && userGoogle.name}
      </Text>
      <Text style={{ fontSize: 18, textAlign: "center", color: "#000" }}>
        Please enter your mobile number to continue!
      </Text>
      <View style={{ flex: 1 }}>
        <TextInput
          theme={{ colors: { text: colors.dark, background: "#fff" } }}
          style={{ marginHorizontal: 30, marginVertical: 20 }}
          mode="outlined"
          label="Enter your mobile number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={(val) => setPhone(val)}
        />
      </View>
      <Button
        onPress={() => handleSubmit()}
        mode="contained"
        style={{ marginHorizontal: 30, borderRadius: 8 }}
      >
        Continue
      </Button>
      <Button onPress={() => navigation.goBack()}>Dismiss </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
