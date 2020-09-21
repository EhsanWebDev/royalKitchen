import Axios from "axios";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import {
  Button,
  TextInput,
  Title,
  ActivityIndicator,
  useTheme,
  Text,
} from "react-native-paper";
import { connect } from "react-redux";
import { makeid } from "../../src/helpers/constants";
import { addAddress } from "../../src/store/actions/address";
import * as Location from "expo-location";

const CreateAdd = ({ user, dispatch, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [location, setLocation] = useState(null);
  const theme = useTheme();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const reqLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Not Granted");
      alert("Please turn on location services");
      return;
    }
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location.coords);
      console.log(location);
    } catch (error) {
      alert("Please turn on location services");
    }
  };
  useEffect(() => {
    reqLocation();
  }, []);

  const submitAdd = async () => {
    setLoading(true);
    if (
      name.length === 0 ||
      email.length === 0 ||
      number.length === 0 ||
      province.length === 0 ||
      city.length === 0 ||
      country.length === 0 ||
      street.length === 0
    ) {
      alert("All fields are required");
    }
    const res = await Axios.post(
      "https://gradhatcreators.com/api/user/add_address",
      {
        name,
        email,
        contact_number: number,
        city,
        province,
        country,
        street_address: street,
        lat: location.latitude,
        lng: location.longitude,
        uid: user.id,
      }
    );

    if (res.data.status) {
      setLoading(false);
      dispatch(
        addAddress({
          name,
          email,
          contact_number: number,
          city,
          province,
          country,
          street_address: street,
          id: makeid(2),
          uid: user.id,
          lat: location.latitude,
          lng: location.longitude,
        })
      );
      alert(res.data.message);
    } else {
      setLoading(false);
      alert("Error occurred !");
    }
    console.log(res.data);

    // console.log();
  };
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
  } else if (!location) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#777", fontSize: 18 }}>Turn On location</Text>
        <Button onPress={() => reqLocation()}>Request again !</Button>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          backgroundColor: theme.dark ? "#333" : "#fff",
        }}
      >
        {/* <Title style={{color: '#000', textAlign: 'center'}}>
        Enter your details
      </Title> */}
        <Text style={{ color: "#777", fontSize: 16, textAlign: "center" }}>
          Your location : {location.latitude} , {location.longitude}
        </Text>
        <KeyboardAvoidingView
          behavior="height"
          style={{ flex: 1, marginHorizontal: 20 }}
        >
          <TextInput
            mode="outlined"
            placeholder="Enter your Name"
            onChangeText={(val) => setName(val)}
            // multiline
            // numberOfLines={4}
            theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
            style={{ backgroundColor: "#fff", fontSize: 18 }}
          />
          <TextInput
            mode="outlined"
            placeholder="Email address"
            keyboardType="email-address"
            // multiline
            // numberOfLines={4}
            theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
            style={{ backgroundColor: "#fff", fontSize: 18 }}
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            mode="outlined"
            placeholder="Mobile Number"
            keyboardType="number-pad"
            // multiline
            // numberOfLines={4}
            theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
            style={{ backgroundColor: "#fff", fontSize: 18 }}
            onChangeText={(val) => setNumber(val)}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TextInput
              mode="outlined"
              placeholder="City name"
              // multiline
              // numberOfLines={4}
              theme={{
                colors: { text: colors.dark, placeholder: colors.dark },
              }}
              style={{ backgroundColor: "#fff", fontSize: 18 }}
              onChangeText={(val) => setCity(val)}
            />
            <TextInput
              mode="outlined"
              placeholder="Province"
              // multiline
              // numberOfLines={4}
              theme={{
                colors: { text: colors.dark, placeholder: colors.dark },
              }}
              style={{ backgroundColor: "#fff", fontSize: 18 }}
              onChangeText={(val) => setProvince(val)}
            />
            <TextInput
              mode="outlined"
              placeholder="Country"
              // multiline
              // numberOfLines={4}
              theme={{
                colors: { text: colors.dark, placeholder: colors.dark },
              }}
              style={{ backgroundColor: "#fff", fontSize: 18 }}
              onChangeText={(val) => setCountry(val)}
            />
          </View>

          <TextInput
            mode="outlined"
            placeholder="Street address"
            multiline
            numberOfLines={4}
            theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
            style={{ backgroundColor: "#fff", fontSize: 18 }}
            onChangeText={(val) => setStreet(val)}
          />
        </KeyboardAvoidingView>
        <Button
          mode="contained"
          onPress={() => submitAdd()}
          style={{ marginHorizontal: 30, marginBottom: 10, borderRadius: 8 }}
        >
          Submit
        </Button>
      </View>
    );
  }
};
const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateAdd);
