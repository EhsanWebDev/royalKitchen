import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import {
  Button,
  useTheme,
  Snackbar,
  Text,
  Colors,
  Title,
} from "react-native-paper";

const Products = ({ navigation, route }) => {
  // const { items } = route.params;
  const [data, setData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (route.params) {
      setData(JSON.parse(route.params.items));
    }
  }, []);
  //   console.log(JSON.parse(props.items));
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.dark ? "#333" : Colors.white,
        // paddingTop: 40,
      }}
    >
      <Title
        style={{
          color: theme.dark ? "#fff" : "#111",
          textAlign: "center",
          fontSize: 26,
          marginVertical: 20,
        }}
      >
        Products List
      </Title>
      {data &&
        data.map((item) => (
          <View key={item.id}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                padding: 5,
                borderBottomWidth: 2,
                borderBottomColor: "#d2d2d2",
                marginBottom: 10,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {/* <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80, resizeMode: "contain" }}
            /> */}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 5,
                    color: theme.dark ? "#fff" : "#111",
                  }}
                >
                  {item.name}{" "}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      marginRight: 20,
                      color: theme.dark ? "#fff" : "#111",
                    }}
                  >
                    Qty: {item.units}{" "}
                  </Text>
                  {/* <Text style={{ fontSize: 14, marginBottom: 5 }}>
              Store Name: {item.store}{" "}
            </Text> */}

                  {item.discountedPrice ? (
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "400",
                          color: theme.dark ? "#fff" : "#111",
                        }}
                      >
                        Unit Price: RS
                        <Text
                          style={{
                            textDecorationLine: "line-through",
                            fontSize: 12,
                            padding: 5,
                            color: theme.dark ? "#fff" : "#111",
                          }}
                        >
                          {" "}
                          {item.price}{" "}
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "600",
                            padding: 5,
                            color: theme.dark ? "#fff" : "#111",
                          }}
                        >
                          {" "}
                          {item.discountedPrice}{" "}
                        </Text>
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "700",
                          color: theme.dark ? "#fff" : "#111",
                        }}
                      >
                        ₹
                        <Text
                          style={{
                            fontSize: 14,
                            color: theme.dark ? "#fff" : "#111",
                          }}
                        >
                          {" "}
                          {item.price}{" "}
                        </Text>
                      </Text>
                    </View>
                  )}
                </View>

                {/* <Text style={{ fontSize: 16 }}>
              Total Amount: {item.price * item.units}{" "}
            </Text> */}
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};

export default Products;
