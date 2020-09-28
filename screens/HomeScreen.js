import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import Swiper from "react-native-swiper";

import StarRating from "../components/StarRating";
import { Title, Button, ActivityIndicator } from "react-native-paper";
import { connect } from "react-redux";
import { getAllCategories } from "../src/store/actions/categories";
import Axios from "axios";

const HomeScreen = ({ navigation, user, categories, dispatch }) => {
  let _isMounted = false;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const handleNavigation = (item) => {
    console.log(item.name);
    dispatch({
      type: "CAT_SELECT",
      payload: item.name,
    });
    navigation.navigate("Categories");
  };
  useEffect(() => {
    _isMounted = true;
    const fetchDate = async () => {
      const res = await dispatch(getAllCategories());

      // console.log(orders.data);
      if (res.data.status) {
        setData(res.data.source);
        setLoading(false);
      }
      // console.log(categories);
    };
    if (_isMounted) {
      fetchDate();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  const theme = useTheme();
  const { colors } = useTheme();
  if (loading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (data.length > 0) {
    return (
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: theme.dark ? "#000" : "#fff", marginTop: -85 },
        ]}
      >
        <StatusBar
          backgroundColor={colors.background}
          barStyle="light-content"
        />
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            // horizontal={false}
            height={200}
            activeDotColor="#333"
            dotColor="#fff"
          >
            {data.length > 0 &&
              data
                .filter((item, index) => index < 4)
                .map((item, index) => (
                  <View style={styles.slide} key={index}>
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
                  </View>
                ))}

            {/* <View style={styles.slide}>
              <ImageBackground
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80',
                }}
                resizeMode="cover"
                style={styles.sliderImage}>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'column',
                  }}>
                  <Title
                    style={{
                      color: 'white',
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingTop: 40,
                      fontSize: 28,
                    }}>
                    BBQ
                  </Title>
                  <Text
                    style={{
                      color: 'white',
                      flex: 1,
                      // justifyContent: 'center',
                      paddingLeft: 20,
                      // paddingTop: 40,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Spicy BBQ
                  </Text>
                  <Button
                    mode="contained"
                    icon="arrow-right"
                    compact
                    contentStyle={{paddingTop: 10}}
                    labelStyle={{
                      marginTop: 10,
                      alignItems: 'center',
                      color: '#fff',
                      paddingRight: 10,
                    }}
                    style={{
                      flex: 0,
                      alignItems: 'flex-end',

                      backgroundColor: '#c0392b',
                    }}>
                    View
                  </Button>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.slide}>
              <ImageBackground
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1491600395818-515d7b81de11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1363&q=80',
                }}
                resizeMode="cover"
                style={styles.sliderImage}>
                <View
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'column',
                  }}>
                  <Title
                    style={{
                      color: 'white',
                      flex: 1,
                      justifyContent: 'center',
                      paddingLeft: 20,
                      paddingTop: 40,
                      fontSize: 28,
                    }}>
                    Desserts
                  </Title>
                  <Text
                    style={{
                      color: 'white',
                      flex: 1,
                      // justifyContent: 'center',
                      paddingLeft: 20,
                      // paddingTop: 40,
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Yummy Dessert flavours
                  </Text>
                  <Button
                    mode="contained"
                    icon="arrow-right"
                    compact
                    color="#fff"
                    contentStyle={{paddingTop: 10}}
                    labelStyle={{
                      marginTop: 10,
                      alignItems: 'center',
                      color: '#fff',
                      paddingRight: 10,
                    }}
                    style={{
                      flex: 0,
                      alignItems: 'flex-end',

                      backgroundColor: '#c0392b',
                    }}>
                    View
                  </Button>
                </View>
              </ImageBackground>
            </View> */}
          </Swiper>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            style={{
              color: theme.dark ? "#fff" : "#333",
              paddingLeft: 20,
              marginTop: 20,
              fontSize: 28,
            }}
          >
            Categories
          </Title>
          <Button
            onPress={() =>
              navigation.navigate("Categories", {
                screen: "CategoryScreen",
              })
            }
            icon="arrow-right"
            style={{ marginTop: 18 }}
          >
            See All
          </Button>
        </View>

        <View style={styles.categoryContainer}>
          {data.length > 0 &&
            data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryBtn}
                onPress={() => handleNavigation(item)}
                // disabled
              >
                <ImageBackground
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="cover"
                  style={[styles.sliderImage, { height: 160, width: "95%" }]}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(0,0,0,0.5)",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Title
                      style={{
                        color: "white",
                        flex: 1,
                        justifyContent: "center",
                        paddingLeft: 20,
                        paddingTop: 40,
                        fontSize: 24,
                      }}
                    >
                      {item.name}
                    </Title>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}

          {/* <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('CardListScreen', {title: 'Restaurant'})
            }>
            <ImageBackground
              source={{
                uri:
                  'https://images.unsplash.com/photo-1518492104633-130d0cc84637?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1226&q=80',
              }}
              resizeMode="cover"
              style={[styles.sliderImage, {height: 160}]}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Title
                  style={{
                    color: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    paddingTop: 40,
                    fontSize: 24,
                  }}>
                  Main Course
                </Title>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('CardListScreen', {title: 'Restaurant'})
            }>
            <ImageBackground
              source={{
                uri:
                  'https://images.unsplash.com/photo-1560269507-9495cdfcadca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
              }}
              resizeMode="cover"
              style={[styles.sliderImage, {height: 160, width: '95%'}]}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Title
                  style={{
                    color: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    paddingTop: 40,
                    fontSize: 24,
                  }}>
                  Desserts
                </Title>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() =>
              navigation.navigate('CardListScreen', {title: 'Restaurant'})
            }>
            <ImageBackground
              source={{
                uri:
                  'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80',
              }}
              resizeMode="cover"
              style={[styles.sliderImage, {height: 160}]}>
              <View
                style={{
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  justifyContent: 'space-between',
                  flex: 1,
                  flexDirection: 'column',
                }}>
                <Title
                  style={{
                    color: 'white',
                    flex: 1,
                    justifyContent: 'center',
                    paddingLeft: 20,
                    paddingTop: 40,
                    fontSize: 24,
                  }}>
                  Salads
                </Title>
              </View>
            </ImageBackground>
          </TouchableOpacity> */}
        </View>
        <View style={[styles.categoryContainer, { marginTop: 10 }]}>
          {/* <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Dineouts</Text>
        </TouchableOpacity> */}
        </View>

        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Recently Viewed
          </Text>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require("../assets/banners/food-banner2.jpg")}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              <StarRating ratings={4} reviews={99} />
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require("../assets/banners/food-banner3.jpg")}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              <StarRating ratings={4} reviews={99} />
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require("../assets/banners/food-banner4.jpg")}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Amazing Food Place</Text>
              <StarRating ratings={4} reviews={99} />
              <Text style={styles.cardDetails}>
                Amazing description for this amazing place
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  return null;
};
const mapStateToProps = (state) => {
  // console.log('state', state);
  return {
    categories: state.category.categories,
    user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: "90%",
    marginTop: 100,
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
