import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Paragraph,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { connect } from "react-redux";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getDistance } from "geolib";
import Axios from "axios";
// import { Container } from './styles';

const Delivery = ({ defaultAddress }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const store = await Axios.get(
          "https://gradhatcreators.com/api/user/store"
        );
        if (store.data.status) {
          setStoreData(store.data.source);
          setLoading(false);
        } else {
          setLoading(false);
          throw store.data;
        }
      } catch (error) {
        console.log("error while getting response");
      }
    };
    fetchData();
  }, []);
  const { colors } = useTheme();
  const handleStoreLocation = () => {
    let pdis = getDistance(
      {
        latitude: storeData.lat,
        longitude: storeData.lng,
      },
      {
        latitude: defaultAddress[0].lat,
        longitude: defaultAddress[0].lng,
      }
    );

    // console.log(pdis);
    if (pdis <= storeData.distance && storeData.distance !== 0) {
      navigation.navigate("PlaceOrder", {
        order_mode: "delivery",
      });
      //  return pdis;
    } else {
      alert("Sorry we don't operate delivery in your area");
    }
  };

  // const calDistance = (lat, lng) => {
  //   const newData = data.storeData.filter(this._getPreciseDistance);
  //   this.setState({ distances: newData });
  //   console.log(this.state.distances);
  // };
  // const _getPreciseDistance = (element) => {
  //   let long = this.state.longitude;
  //   let lat = this.state.latitude;
  //   let pdis = getDistance(
  //     {
  //       latitude: element.LATITUDE ? element.LATITUDE : 0,
  //       longitude: element.LONGITUDE ? element.LONGITUDE : 0,
  //     },
  //     {
  //       latitude: element.LATITUDE ? lat : 0,
  //       longitude: element.LONGITUDE ? long : 0,
  //     }
  //   );
  //   if (pdis < this.state.radius * 1000 && this.state.radius !== 0) {
  //     return pdis;
  //   }
  // };
  if (loading) {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#333" : "#fff",
        // marginHorizontal: 16,
        padding: 10,
      }}
    >
      {defaultAddress && (
        <View>
          <Title style={{ color: "#777", textAlign: "center" }}>
            Default address
          </Title>
          <Card
            style={{
              // marginHorizontal: 5,
              marginVertical: 20,
              borderColor: "#000",
              borderWidth: 1,
            }}
          >
            <Card.Title
              title={defaultAddress[0].street_address}
              titleStyle={{ color: theme.dark ? "#fff" : "#000", fontSize: 14 }}
              subtitleStyle={{ color: theme.dark ? "#fff" : "#000" }}
              subtitle={` ${defaultAddress[0].city} , ${defaultAddress[0].province}`}
              left={(props) => (
                <Icon
                  {...props}
                  name="home-city-outline"
                  color={theme.dark ? "#fff" : "#000"}
                  size={40}
                />
              )}

              // right={props => (
              //   <IconButton {...props} icon="more-vert" onPress={() => {}} />
              // )}
            />
            <Card.Content>
              <Text
                style={{
                  color: theme.dark ? "#fff" : "#000",
                }}
              >
                Name: {defaultAddress[0].name}
              </Text>
              <Paragraph
                style={{
                  color: theme.dark ? "#fff" : "#000",
                }}
              >
                Phone: {defaultAddress[0].contact_number}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("Address")}>
                manage addresses
              </Button>
            </Card.Actions>
          </Card>
        </View>
      )}

      {!defaultAddress && (
        <View style={{ flex: 1 }}>
          <Title style={{ color: "#777" }}>
            Please choose a default address or add a new one
          </Title>
          <Button
            mode="contained"
            style={{ marginHorizontal: 30, marginTop: 60, borderRadius: 8 }}
            onPress={() => navigation.navigate("Address")}
          >
            manage addresses
          </Button>
        </View>
      )}
      {defaultAddress && (
        <Button
          mode="contained"
          style={{ marginHorizontal: 30, borderRadius: 8 }}
          onPress={() => handleStoreLocation()}
        >
          Continue
        </Button>
      )}
    </View>
  );
};
const mapStateToProps = ({ auth, address }) => ({
  user: auth.user,
  defaultAddress: address.defaultAddress,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Delivery);
