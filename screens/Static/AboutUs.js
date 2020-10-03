import React from "react";
import { ScrollView, View } from "react-native";
import { Text, Title } from "react-native-paper";

// import { Container } from './styles';

const AboutUs = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Title
          style={{
            color: "#000",
            fontSize: 24,
            paddingTop: 10,
            textAlign: "center",
          }}
        >
          About Us
        </Title>
        <Text
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Royal Kitchen
          </Text>{" "}
          is the most popular foods not only in India but worldwide, and so it
          has a special place of pride in Indian food.{"\n"}
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Royal Kitchen
          </Text>{" "}
          is our effort to provide delicious, hygienic, home style food to our
          customers with pride. We have expert cooks and perfect atmosphere to
          cater to and meet the expectations of authentic food consumers.{"\n"}
          The business is based on complete understanding of our customers,
          their taste and preferences. We try to offer them exactly what they
          are looking for, with importance on traditional yet creative cuisines.
          We have built a reputation for serving great food, every time. We take
          special care prepare our delicacies and great pride in serving them to
          our patrons.{"\n"}
          <Text style={{ fontWeight: "bold", color: "#000", fontSize: 16 }}>
            Our Vision{"\n"}
          </Text>
          <Text style={{ fontWeight: "bold", color: "#000" }}>
            Royal Kitchen
          </Text>{" "}
          will be a brand of choice for our consumers, our communities, our
          investors and our associates.{"\n"}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
            textDecorationLine: "underline",
          }}
        >
          Our Mission
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
          }}
        >
          To Our Associates
        </Text>
        <Text style={{ color: "#000" }}>
          We shall provide an inspiring, rewarding, and safe work environment
          for our people – our greatest asset and the key to our success.
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
          }}
        >
          To Our Community
        </Text>
        <Text style={{ color: "#000" }}>
          We shall contribute what we can to nurture and make a positive impact
          on our environment, and to be proactive and responsible members of the
          communities where we operate.
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Our Values
        </Text>

        <Text style={{ color: "#000" }}>
          Our core values are teamwork, passion and commitment, respect,
          integrity. This shall reflect in the pride and joy we take in serving
          our Customers, each other, and the communities where we operate.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutUs;
