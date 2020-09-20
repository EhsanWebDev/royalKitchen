import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";

import Swiper from "react-native-swiper";
import { Button, Title } from "react-native-paper";
const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: "#FDFDFD",
          // opacity: 1.0,
          // marginTop: 30,
          // borderTopLeftRadius: 70,
          // borderTopRightRadius: 70,
        }}
      >
        <Swiper
          // style={{paddingTop: 1}}
          autoplay
          height={Dimensions.get("screen").height}
          activeDotColor="#00DAAC"
          dotColor="#000"
        >
          <View style={styles.slide}>
            <Image
              // source={require('../assets/slide_3.png')}
              source={{
                uri:
                  "https://images.unsplash.com/photo-1529566652340-2c41a1eb6d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80",
              }}
              resizeMode="cover"
              style={styles.sliderImage}
            />
            <Title
              style={{
                color: "#00DAAC",
                //   textAlign: 'center',
                marginTop: 40,
                marginHorizontal: 20,
                fontSize: 30,
                //   fontWeight: 'bold',
              }}
            >
              Order Online or Pick up
            </Title>
            <Text
              style={{
                color: "black",
                marginTop: 10,
                marginHorizontal: 20,
                fontSize: 14,
                //   fontWeight: 'bold',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            </Text>
          </View>
          <View style={styles.slide}>
            <Image
              // source={require('../assets/slide_2.png')}
              source={{
                uri:
                  "https://images.unsplash.com/photo-1536184071535-78906f7172c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80",
              }}
              resizeMode="cover"
              style={styles.sliderImage}
            />
            <Title
              style={{
                color: "#00DAAC",
                //   textAlign: 'center',
                marginTop: 40,
                marginHorizontal: 20,
                fontSize: 30,
                //   fontWeight: 'bold',
              }}
            >
              Popular Dishes
            </Title>
            <Text
              style={{
                color: "black",
                marginTop: 10,
                marginHorizontal: 20,
                fontSize: 14,
                //   fontWeight: 'bold',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            </Text>
          </View>
          <View style={styles.slide}>
            <Image
              // source={require('../assets/slide_1.png')}
              source={{
                uri:
                  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=650&q=80",
              }}
              resizeMode="cover"
              style={styles.sliderImage}
            />
            <Title
              style={{
                color: "#00DAAC",
                //   textAlign: 'center',
                marginTop: 40,
                marginHorizontal: 20,
                fontSize: 30,
                //   fontWeight: 'bold',
              }}
            >
              Best food in town
            </Title>
            <Text
              style={{
                color: "black",
                marginVertical: 20,
                marginHorizontal: 20,
                fontSize: 14,
                //   fontWeight: 'bold',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do{" "}
            </Text>
          </View>
        </Swiper>
        <Button
          onPress={() => navigation.navigate("SignInScreen")}
          style={{
            // marginTop: Dimensions.get('screen').height / 4,
            // marginHorizontal: 20,
            // flex: 1,
            position: "absolute",
            bottom: "6%",
            left: "10%",
            // marginTop: height / 16,
            alignSelf: "center",
            width: "80%",
            backgroundColor: "#FF5763",
            borderRadius: 10,
            // padding: 5,
          }}
          labelStyle={{ fontWeight: "bold", fontSize: 16 }}
          mode="contained"
        >
          Get started
        </Button>
      </View>

      {/* <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig">
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}>
          Find best food in your locality!
        </Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
            <LinearGradient
              colors={['#FFA07A', '#FF6347']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View> */}
    </View>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)",
    // backgroundColor: '#FF6347',
    // backgroundColor: '#FFF',
  },
  bg_img: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    opacity: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  slide: {
    flex: 1,
    // paddingVertical: 10,
    // justifyContent: 'space-between',
    // backgroundColor: 'transparent',
    // borderRadius: 8,
  },
  sliderImage: {
    // height: '45%',
    height: Dimensions.get("screen").height / 2,
    width: "100%",
    alignSelf: "center",
    resizeMode: "cover",
    // borderRadius: 8,
  },

  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
