import React from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import {
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
// import { Container } from './styles';

const Delivery = ({ defaultAddress }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { colors } = useTheme();
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
              marginHorizontal: 15,
              marginVertical: 10,
              borderColor: "#000",
              borderWidth: 1,
            }}
          >
            <Card.Title
              title={defaultAddress[0].street_address}
              titleStyle={{ color: "#000" }}
              subtitleStyle={{ color: "#333" }}
              subtitle={defaultAddress[0].city}
              left={(props) => (
                <Icon
                  {...props}
                  name="home-city-outline"
                  color="#000"
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
                  color: "#000",
                }}
              >
                Name: {defaultAddress[0].name}
              </Text>
              <Paragraph
                style={{
                  color: "#000",
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
