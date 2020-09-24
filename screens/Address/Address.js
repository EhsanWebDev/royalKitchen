import Axios from "axios";
import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text, Alert } from "react-native";
import {
  ActivityIndicator,
  Card,
  FAB,
  useTheme,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";
import { connect } from "react-redux";
import {
  MaterialCommunityIcons as Icon,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { allAddress, thisAddress } from "../../src/store/actions/address";
const Address = ({ user, navigation, dispatch, address }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  const handleDefault = (item) => {
    dispatch(thisAddress(item));
    navigation.goBack();
  };
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(allAddress(user.id));
      // console.log(res.data);
      if (res.data.status) {
        setLoading(false);
      } else {
        alert("error occurred on the server");
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
  }
  const delAdd = async (id) => {
    setLoading(true);
    const del = await Axios.post(
      "https://gradhatcreators.com/api/user/del_address",
      {
        address_id: id,
      }
    );
    if (del.data.status) {
      dispatch({ type: "DELETE_ADDRESS", payload: id });
      setLoading(false);
    } else {
      setLoading(false);
      alert("Error Occurred while deleting your address");

      return;
    }
  };
  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address ?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => delAdd(id) },
      ],
      { cancelable: false }
    );
  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? "#333" : "#fff" }}>
      <Title
        style={{
          color: theme.dark ? "#fff" : "#111",
          textAlign: "center",
          marginVertical: 20,
          fontSize: 26,
        }}
      >
        Previously Saved addresses
      </Title>
      {address && (
        <FlatList
          data={address}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                borderColor: "#000",
                borderWidth: 1,
                position: "relative",
              }}
            >
              <Card.Title
                title={item.street_address}
                titleStyle={{
                  color: theme.dark ? "#fff" : "#000",
                  fontSize: 14,
                }}
                subtitleStyle={{ color: theme.dark ? "#fff" : "#777" }}
                subtitle={`${item.city} , ${item.province}`}
                right={(props) => (
                  <View
                    style={{
                      flex: 1,
                      marginTop: 15,
                      paddingRight: 5,
                      justifyContent: "space-between",
                      // backgroundColor: "#fff",
                    }}
                  >
                    <Feather
                      {...props}
                      onPress={() =>
                        navigation.navigate("EditAddress", {
                          item,
                        })
                      }
                      style={{
                        backgroundColor: theme.dark ? "#333" : "#fff",
                      }}
                      name="edit"
                      size={21}
                      color="#e67e22"
                    />
                    <Feather
                      {...props}
                      onPress={() => createTwoButtonAlert(item.id)}
                      style={{
                        backgroundColor: theme.dark ? "#333" : "#fff",
                      }}
                      name="trash-2"
                      size={24}
                      color="#c0392b"
                    />
                  </View>
                )}
                left={(props) => (
                  <Icon
                    {...props}
                    name="home-city-outline"
                    color={theme.dark ? "#fff" : "#000"}
                    size={32}
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
                  Name: {item.name}
                </Text>
                <Paragraph
                  style={{
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Phone: {item.contact_number}
                </Paragraph>
                <Paragraph
                  style={{
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Location: {item.lat} , {item.lng}
                </Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleDefault(item)}>
                  Use this address
                </Button>
              </Card.Actions>
            </Card>
          )}
        />
      )}
      {!address && (
        <View style={{ flex: 2, alignItems: "center" }}>
          <AntDesign name="home" size={40} color="black" />
          <Text style={{ fontSize: 18 }}>
            No Addresses found. Please add one
          </Text>
        </View>
      )}

      <FAB
        style={styles.fab}
        small
        label="Add"
        icon="plus"
        onPress={() => navigation.navigate("CreateAdd")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
const mapStateToProps = ({ auth, address }) => ({
  user: auth.user,
  address: address.address,
});
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Address);
