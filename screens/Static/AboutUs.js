import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import Swiper from "react-native-swiper";

// import { Container } from './styles';

const AboutUs = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", marginTop: -90 }}>
      <View style={{ flex: 1, marginHorizontal: 10, marginTop: 90 }}>
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
export default AboutUs;
