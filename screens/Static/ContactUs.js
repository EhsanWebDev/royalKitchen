import Axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Button, Colors, Text, TextInput, useTheme } from "react-native-paper";

// import { Container } from './styles';

const ContactUs = () => {
  const theme = useTheme();
  const { colors } = useTheme();
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false)
  const [issue, setIssue] = useState("");
  const [emailData, setEmailData] = useState({
    email: "",
    errorEmail: false,
    errorMobile: false,
    check_textInputChangeEmail: false,
  });
  const textInputChangeEmail = (val) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(String(val).toLowerCase())) {
      setEmailData({
        ...emailData,
        email: val,
        errorEmail: false,
        check_textInputChangeEmail: true,
      });
    } else {
      setEmailData({
        ...emailData,
        email: val,
        errorEmail: "Please enter a valid email-address",
        check_textInputChangeEmail: false,
      });
    }
  };

  const handleSubmit =async () => {
    if (
      number.length === 0 ||
      emailData.errorEmail ||
      emailData.email.length === 0
    ) {
      alert("Email and Phone number is required");
      return;
    }

    if (subject.length === 0 || issue.length === 0) {
      alert("Enter subject and issue to submit");
      return;
    }
    setLoading(true)
    const res = await Axios.post('https://gradhatcreators.com/api/user/contact-us', {
      email: emailData.email, 
      phone: number, 
      subject: subject, 
      issue : issue
    })

    if (res.data.status) {
      // alert(res.data.message)
      setEmailData({
        ...emailData , email:''
      })
      setNumber('')
      setIssue('')
      setSubject('')
      setLoading(false)
      showMessage({
        message: 'Form submitted successfully', 
        type: 'success', duration: 2000,
       
      })
      
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#333" : "#fff",
        marginTop: -100,
      }}
    >
      <View style={{ flex: 1, marginTop: 120, marginHorizontal: 20 }}>
        {/* <Text style={{ color: Colors.black }}>Hello</Text> */}
        <TextInput
          mode="outlined"
          label="Email address"
          keyboardType="email-address"
          // multiline
          // numberOfLines={4}
          value={emailData.email}
          theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
          style={{ backgroundColor: "#fff", fontSize: 18 }}
          onChangeText={(val) => textInputChangeEmail(val)}
        />
        {emailData.errorEmail && (
          <Text style={{ color: "#c0392b" }}>{emailData.errorEmail}</Text>
        )}

        <TextInput
          mode="outlined"
          label="Mobile Number"
          keyboardType="number-pad"
          value={number}
          // multiline
          // numberOfLines={4}
          theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
          style={{ backgroundColor: "#fff", fontSize: 18, marginTop: 10 }}
          onChangeText={(val) => setNumber(val)}
        />
        <TextInput
          mode="outlined"
          label="Subject"
          value={subject}
          //   keyboardType="number-pad"
          // multiline
          // numberOfLines={4}
          theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
          style={{ backgroundColor: "#fff", fontSize: 18, marginTop: 10 }}
          onChangeText={(val) => setSubject(val)}
        />
        <TextInput
          mode="outlined"
          label="Describe your issue"
          value={issue}
          //   keyboardType="number-pad"
          multiline
          numberOfLines={4}
          theme={{ colors: { text: colors.dark, placeholder: colors.dark } }}
          style={{ backgroundColor: "#fff", fontSize: 18, marginVertical: 10 }}
          onChangeText={(val) => setIssue(val)}
        />
        <Button
          mode="contained" loading={loading}
          style={{ marginTop: 20 }}
          onPress={handleSubmit}
        >
          Submit
        </Button>
      </View>
      <View style={{ backgroundColor: "#fab1a0" }}>
        <Text
          style={{ color: Colors.black, textAlign: "center", fontSize: 16 }}
        >
          Or Contact Us on :
        </Text>
        <Text
          style={{
            color: Colors.black,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          (+91)-921-646-6693
        </Text>
      </View>
    </View>
  );
};

export default ContactUs;
