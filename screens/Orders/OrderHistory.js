import Axios from "axios";
import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import {
  ActivityIndicator,
  Card,
  FAB,
  useTheme,
  Button,
  Title,
  Paragraph,
  ProgressBar,
  Colors,
  Chip,
} from "react-native-paper";
import { connect } from "react-redux";
import {
  MaterialCommunityIcons as Icon,
  AntDesign,
  Octicons,
  Feather,
} from "@expo/vector-icons";
import { allAddress, thisAddress } from "../../src/store/actions/address";
import Products from "./Products";
const OrderHistory = ({ user, navigation, dispatch, address }) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const order_history = await Axios.post(
        "https://gradhatcreators.com/api/user/order_history",
        {
          uid: user.id,
        }
      );

      if (order_history.data.status) {
        setData(order_history.data.source);
        // console.log(order_history.data.source.products);
        setLoading(false);
      } else {
        alert("Error Occurred");
        setLoading(false);
        return;
      }

      //   console.log(order_history.data);
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
        Your Order history
      </Title>
      {data.length > 0 && (
        <FlatList
          data={data}
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
                title={`Order tracking id : ${item.id}`}
                titleStyle={{
                  color: theme.dark ? "#fff" : "#000",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
                subtitleStyle={{ color: theme.dark ? "#fff" : "#777" }}
                subtitle={`Created at :${item.created_on}`}
                left={(props) => (
                  <Icon
                    {...props}
                    name="truck-delivery"
                    color={theme.dark ? "#fff" : "#777"}
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
                  Total Price: {item.price}
                </Text>
                <Paragraph
                  style={{
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Order Type: {item.type}
                </Paragraph>
                <Paragraph
                  style={{
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Order Status : {item.status}
                </Paragraph>
                <ProgressBar
                  progress={1}
                  color={Colors.green700}
                  style={{
                    height: 12,
                    width: "100%",
                    borderRadius: 20,
                    marginVertical: 5,
                  }}
                />
                <Paragraph
                  style={{
                    color: theme.dark ? "#fff" : "#000",
                  }}
                >
                  Order Items
                </Paragraph>
                <View
                  style={{ flexDirection: "row", flex: 1, flexWrap: "wrap" }}
                >
                  {item.products &&
                    JSON.parse(item.products).map((item, index) => {
                      if (index < 3) {
                        return (
                          <Chip
                            selected
                            selectedColor="black"
                            key={item.id}
                            style={{
                              backgroundColor: "#ddd",
                              marginHorizontal: 5,
                              marginVertical: 3,
                            }}
                            textStyle={{ fontWeight: "bold" }}
                          >
                            {item.name}
                          </Chip>
                        );
                      }
                    })}
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Button
                    onPress={() =>
                      navigation.navigate("Products", {
                        items: item.products,
                      })
                    }
                    icon="arrow-right"
                    style={{ marginTop: 18 }}
                    labelStyle={{ color: "#777" }}
                  >
                    See All Products
                  </Button>
                </View>
              </Card.Content>

              {/* <Card.Actions>
                <Button onPress={() => handleDefault(item)}>Re-Order</Button>
              </Card.Actions> */}
            </Card>
          )}
        />
      )}
      {data.length <= 0 && (
        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Octicons name="package" size={40} color="#777" />
          <Text style={{ fontSize: 18, color: "#777" }}>
            No Previous Orders
          </Text>
        </View>
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
