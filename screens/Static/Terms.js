import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, Headline, Paragraph, Text, Title } from "react-native-paper";
import Swiper from "react-native-swiper";

// import { Container } from './styles';

const Terms = () => {
  return (
    <ScrollView style={{ flex: 1, marginTop: -90, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, marginHorizontal: 10, marginTop: 90 }}>
        <Title
          style={{
            color: "#000",
            fontSize: 24,
            paddingTop: 10,
            textAlign: "center",
          }}
        >
          Terms And Conditions
        </Title>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            // horizontal={false}
            height={200}
            activeDotColor="#333"
            dotColor="#fff"
          >
            {/* <View style={styles.slide}>
                    <ImageBackground
                      source={{
                        uri: item.image,
                      }}
                      resizeMode="cover"
                      style={styles.sliderImage}
                    >
                      <View
                        style={{
                          backgroundColor: "rgba(0,0,0,0.5)",
                          justifyContent: "space-between",
                          flex: 1,
                          flexDirection: "column",
                        }}
                      >
                        <Title
                          style={{
                            color: "white",
                            flex: 1,
                            justifyContent: "center",
                            paddingLeft: 20,
                            paddingTop: 20,
                            fontSize: 32,
                            fontWeight: "bold",
                          }}
                        >
                          {item.name}
                        </Title>
                        <Text
                          style={{
                            color: "white",
                            flex: 1,
                            // justifyContent: 'center',
                            paddingLeft: 20,
                            // paddingTop: 40,
                            fontSize: 13,
                            // fontWeight: 'bold',
                          }}
                        >
                          {item.desc}
                        </Text>
                        <Button
                          mode="contained"
                          icon="arrow-right"
                          compact
                          contentStyle={{ paddingTop: 10 }}
                          labelStyle={{
                            marginTop: 10,
                            alignItems: "center",
                            color: "#fff",
                            paddingRight: 10,
                          }}
                          onPress={() =>
                            navigation.navigate("Categories", {
                              params: {
                                selected: item.name,
                              },
                              screen: "CategoryScreen",
                            })
                          }
                          style={{
                            flex: 0,
                            // marginTop: 10,
                            // paddingTop: 10,
                            alignItems: "flex-end",

                            backgroundColor: "#c0392b",
                          }}
                        >
                          Discover
                        </Button>
                      </View>
                    </ImageBackground>
                  </View> */}

            <View style={styles.slide}>
              <ImageBackground
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "space-between",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Title
                    style={{
                      color: "white",
                      flex: 1,
                      justifyContent: "center",
                      paddingLeft: 20,
                      paddingTop: 40,
                      fontSize: 28,
                    }}
                  >
                    BBQ
                  </Title>
                  <Text
                    style={{
                      color: "white",
                      flex: 1,
                      // justifyContent: 'center',
                      paddingLeft: 20,
                      // paddingTop: 40,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Spicy BBQ
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.slide}>
              <ImageBackground
                source={{
                  uri:
                    "https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80",
                }}
                resizeMode="cover"
                style={styles.sliderImage}
              >
                <View
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "space-between",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Title
                    style={{
                      color: "white",
                      flex: 1,
                      justifyContent: "center",
                      paddingLeft: 20,
                      paddingTop: 40,
                      fontSize: 28,
                    }}
                  >
                    BBQ
                  </Title>
                  <Text
                    style={{
                      color: "white",
                      flex: 1,
                      // justifyContent: 'center',
                      paddingLeft: 20,
                      // paddingTop: 40,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    Spicy BBQ
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </Swiper>
        </View>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          These terms must be accepted by you when you use Royal Kitchen website
          or Application:
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          1) You must not accept these terms if:
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          You are not lawfully entitled to use Royal Kitchen website or App in
          the country in which you are located or reside {"\n"}If you are not of
          legal age to bind agreement with us
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          2) If any change made to Terms & Conditions:
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen team can modify Terms & conditions at any time, in sole
          discretion. If Royal Kitchen team will be modifying any content, team
          will let you know either by site or through app. It's a major factor
          that you do agree to modified Terms & conditions. If you don't agree
          to be bound by the modified Terms, then you can't use the services any
          more. Over Srvices are evolving over time we can change or close any
          services at any time without any notice, at our sole discretion.
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          3) Privacy :
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Your privacy is very important to us. We will assure you that your any
          private data will not be disclosed anywhere at any cost. If you have
          any questions or concerns about terms and conditions, please contact
          us at support@RoyalKitchen.com
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          4) legal Activity
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Do not use Royal Kitchen to promote any illegal activities.
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          5) Harmful Activities
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Do not distribute content that harms or interferes with the operation
          of the networks,Servers, or other infrastructure of Royal Kitchen.
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          6) Hacking Personal Information
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Do not access other user’s account without their permission. Do not
          disturb other people’s personal information like email Id, passwords,
          play store or app store credentials without their permission.
        </Paragraph>

        <Headline
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Refund Policy:
        </Headline>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          1) For Customer of Restaurant:
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          IN case of payment did by mistake or in case of any payment related
          issues for food ordered with Royal Kitchen, we are not entitled to
          refund any amount.
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          2) Order Approval:
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen is not responsible for any kind of order cancellation
          once placed. Delivery time, Taxes, Delivery Charges and Delivery times
          are decided time to time based on the situation and shall update if
          any kind of changes of extra charges. Royal Kitchen is not taking any
          kind of taxes or extra charges from the customers.
        </Paragraph>
        <Paragraph
          style={{
            textAlign: "justify",
            fontWeight: "bold",
            color: "#000",
            marginTop: 20,
          }}
        >
          3) Blocking or Deleting your Account:
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          If we notice any illegal activity then we have all rights to
          permanently Block your account without any notice and reasons.
        </Paragraph>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    // height: 200,
    width: "100%",
    // marginTop: 100,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: "row",
    // width: '100%',
    flexWrap: "wrap",
    // alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  categoryBtn: {
    // flex: 1,
    width: "50%",
    marginHorizontal: 0,
    borderRadius: 15,
    marginVertical: 3,

    // alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: "center",
    marginTop: 5,
    color: "#de4f35",
  },
  cardsWrapper: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
export default Terms;
