import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { Button, useTheme, Snackbar, Text } from "react-native-paper";

const Products = (props) => {
  const { items } = props;
  const [data, setData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setData(JSON.parse(props.items));
  }, []);
  //   console.log(JSON.parse(props.items));
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {data &&
        data.map((item) => (
          <View key={item.id}>
            <Text style={{ color: "#000" }}>{item.name}</Text>
          </View>
        ))}
    </View>
  );
};

export default Products;
