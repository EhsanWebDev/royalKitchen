import * as React from "react";
import { PermissionsAndroid, Platform, ScrollView, View } from "react-native";
import {
  RadioButton,
  Text,
  Title,
  useTheme,
  withTheme,
} from "react-native-paper";
import Delivery from "./Delivery";
import TakeAway from "./TakeAway";

class ConfirmDelivery extends React.Component {
  state = {
    value: "delivery",
    latitude: "",
    longitude: "",
  };

  async componentDidMount() {}

  render() {
    const { value } = this.state;

    const { theme } = this.props;
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        style={{
          backgroundColor: theme.dark ? "#333" : "#fff",

          marginTop: -95,
        }}
      >
        <RadioButton.Group
          onValueChange={(value) => this.setState({ value })}
          value={value}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: 100,
              justifyContent: "space-around",
            }}
          >
            <Title style={{ color: theme.dark ? "#fff" : "#333" }}>
              Select your method
            </Title>
            <View>
              <Text style={{ color: theme.dark ? "#fff" : "#333" }}>
                Delivery
              </Text>
              <RadioButton
                value="delivery"
                uncheckedColor={theme.dark ? "#fff" : "#333"}
              />
            </View>
            <View>
              <Text style={{ color: theme.dark ? "#fff" : "#333" }}>
                Take Away
              </Text>
              <RadioButton
                value="take-away"
                uncheckedColor={theme.dark ? "#fff" : "#333"}
              />
            </View>
          </View>
        </RadioButton.Group>
        {value === "delivery" && <Delivery />}
        {value === "take-away" && <TakeAway />}
      </ScrollView>
    );
  }
}

export default withTheme(ConfirmDelivery);
