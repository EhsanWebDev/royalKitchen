import React from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, Headline, Paragraph, Text, Title } from "react-native-paper";
import Swiper from "react-native-swiper";

// import { Container } from './styles';

const Policy = () => {
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
          Privacy Policy
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
          Welcome At Royal Kitchen's we recognize that privacy is important!!
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          This site is owned by Jubilant Foodworks Limited. This Privacy Policy
          is designed to tell you about our practices regarding collection, use,
          and disclosure of information that you may provide via this site.
          Please be sure to read this entire Privacy Policy before using or
          submitting information to this site.
        </Paragraph>
        <Headline
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Concent
        </Headline>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          By using this site, you agree to the terms of this Privacy Policy.
          Whenever you submit information via this site, you consent to the
          collection, use and disclosure of the information in accordance with
          this Privacy Policy.
        </Paragraph>
        <Headline
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Information Collected
        </Headline>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          In general, you can visit this Web site without telling us who you are
          or revealing any information about yourself. Our web servers collect
          the domain names, not the e-mail addresses, of visitors
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen's may collect personal information from you including
          your first and last name, address, telephone and mobile number(s),
          email address, credit card details and any other information, when you
          knowingly provide us with this information. This will generally occur
          when you either: {"\n"}
          {"\n"}
          Visit Online ordering site to place order.{"\n"}Enter into a
          competition or promotion.{"\n"}Participate in a survey.{"\n"}Subscribe
          to our mailing list.{"\n"}Register as a WOW club member.
          {"\n"}
          Apply for a job.{"\n"}Request information regarding our Franchise
          system.{"\n"}Submit website feedback {"\n"} {"\n"}Where ever Royal
          Kitchen's collects personal information about you from someone else,
          Royal Kitchen's or the franchisee will take reasonable steps to advise
          you.
        </Paragraph>

        <Headline
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Use and Disclosure
        </Headline>
        <Paragraph
          style={{
            color: "#000",
            fontSize: 14,
            textAlign: "justify",
            marginTop: 10,
          }}
        >
          By using this site, you agree to the terms of this Privacy Policy.
          Whenever you submit information via this site, you consent to the
          collection, use and disclosure of the information in accordance with
          this Privacy Policy. {"\n"}
          {"\n"}
          Except as otherwise stated, we may use information collected via this
          site to improve the content of our site, to customize the site to your
          preferences, to communicate information to you (if you have requested
          it), and for any other purpose specified.{"\n"}
          {"\n"}Royal Kitchen's may use the personal information that you submit
          to restaurant and process that information in order to provide goods
          and services. Generally, we may use your personal information in the
          ways in which you would expect, including but not limited, to any of
          the following purposes:{"\n"}
          {"\n"}
          To allow you to participate as WOW Club member. {"\n"}To process any
          job application you may submit. {"\n"}To provide you with any
          restaurant or promotion information you may request. {"\n"}To process
          any online ordering. {"\n"}To determine the number of visitors to our
          websites and conduct reviews of our sites. {"\n"}To fulfill prizes,
          awards and purchases To respond to specific requests from visitors.{" "}
          {"\n"}To keep you informed about any changes to our websites. {"\n"}To
          conduct marketing research.{"\n"}
          {"\n"}And to now and again send you offers or information on products
          or services that we consider will be of interest to you. {"\n"}
          {"\n"}Note: If you wish to unsubscribe from receiving any promotional
          communication from us please sms DOM UNSUB at 5757575 to unregister.
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Further information on how we use your personal information when using
          our Internet ordering system.
        </Paragraph>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          When using the Royal Kitchen's Pizza internet ordering system
          additional information is collected when you order a pizza online.
          This information assists in the delivery to your door and to verify
          your credit card payment. The internet order system also stores
          information about your order to help you remember and re-order the
          same menu in future. When concluding your order via the Royal
          Kitchen's Pizza internet ordering system, you will be asked if you
          would like to become a WOW Club member. To not become a member untick
          the box.
        </Paragraph>
        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Credit card details
        </Title>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen's does not store any of your credit card details.
        </Paragraph>
        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Third Party Disclosure
        </Title>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen's may share statistics and personal information between
          themselves and with companies that are related to Royal Kitchen's
          including our international branches.Personal information that you
          submit to Royal Kitchen's may be disclosed to a third party: Such as
          our suppliers, as mailing houses, who are employed to provide some of
          our services such; to meet the purpose for which it was submitted.{" "}
          {"\n"}
          {"\n"}If you have provided your express consent to share the
          information. {"\n"}If Royal Kitchen's are required or authorized by
          law to disclose the information. {"\n"}If your personal information is
          collected in connection with a joint promoter, to that joint promoter
          for marketing and research purposes. {"\n"}If Royal Kitchen's feel you
          might like to know about a third party's goods and services we may
          supply that personal information to that third party. (We know that
          many of our guests enjoy receiving these excellent offers). {"\n"}
          {"\n"}Or if you place an order via our internet order system, your
          details will be passed on to Verisign, who receive your credit card
          details for internet order payment. Verisign is a secure internet
          payment gateway that secures your credit card number during
          transmission. See: www.verisign.com for further details.
        </Paragraph>

        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Access, Accuracy and Security
        </Title>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen's will take reasonable steps to ensure that the personal
          information collected is accurate, complete and up-to-date. You can
          access and request correction of any personal information concerning
          you at any time. You may also request that your personal information
          be deleted at any time. Any such requests should be made directly by
          contacting us.Royal Kitchen's will take reasonable steps to protect
          personal information from misuse, loss and unauthorized access,
          modification or disclosure. {"\n"}
        </Paragraph>
        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Sensitive Information
        </Title>

        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Royal Kitchen's will not collect, use or disclose sensitive
          information except with your specific consent.
        </Paragraph>
        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Click stream Data
        </Title>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Each time you visit the Royal Kitchen's site our server collects some
          anonymous information, known as click-stream data, including the type
          of browser and system you are using; the address of the site you have
          come from and move to after your visit; the date and time of your
          visit; and your server's IP address. Royal Kitchen's may collect this
          information for statistical purposes to find out how the websites is
          used and navigated, including the number of hits, the frequency and
          duration of visits, most popular session times. Royal Kitchen's may
          use this information to evaluate and improve the Royal Kitchen's
          websites.
          {"\n"}
        </Paragraph>
        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Cookies
        </Title>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          A Cookie is a piece of information that our web server may send to
          your machine when you visit a Royal Kitchen's site. A Cookie helps us
          to recognize you when you re-visit our sites and to co-ordinate your
          access to different pages on the sites. For example, once you have
          placed a new pizza order you may be offered the opportunity to
          personalize your order so that the system remembers it for future use.
          A cookie will be set on your machine that enables us to recognize your
          computer when you return to order your favorite pizza next time. With
          most Internet Browsers, you can erase Cookies from your computer hard
          drive, block all Cookies, or receive a warning before a Cookie is
          stored. If you want to do this, refer to your Browser instructions or
          help screen to learn more. If you disable all cookies, you may not be
          able to take advantage of all the features of our sites
          {"\n"}
        </Paragraph>
        <Title
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          Changes
        </Title>
        <Paragraph
          style={{
            color: "#000",

            textAlign: "justify",
            marginTop: 10,
          }}
        >
          If this Privacy Policy is changed, the revised policy will be posted
          on this site. Please check back periodically, and especially before
          you provide any personally identifiable information. This Privacy
          Policy was last updated on Sept 20, 2020.
          {"\n"}
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
export default Policy;
