import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { ActivityIndicator, Button, withTheme } from "react-native-paper";
import styled from "styled-components/native";
import ListItem from "../../components/ListItem";
import CartIcon from "../Cart/CartIcon";

import { Ionicons as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import Axios from "axios";

const CategoriesList = styled.ScrollView`
  margin-top: 15px;
  flex-grow: 0;
`;
const Category = styled.TouchableOpacity`
  align-items: center;
  margin: 0 16px;
  height: 40px;
`;

const CategoryName = styled.Text`
  font-size: ${(props) => (props.selected ? "18px" : "13px")};
  color: ${(props) => (props.dark ? "#fff" : "#333")};
  font-weight: ${(props) => (props.selected ? "bold" : "200")};
`;

const CategoryDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #c23616;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => (props.dark ? "#333" : "#fff")};
`;

const All = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(props.id);
    const fetchData = async () => {
      const res = await Axios.post(
        "https://gradhatcreators.com/api/user/products",
        {
          cid: props.id,
        }
      );
      if (res.data.status) {
        setData(res.data.source);
        setLoading(false);
      } else {
        setLoading(false);
        alert("error occured");
      }
      // console.log('Response', res);
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (data.length <= 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            // fontWeight: 'bold',
            // alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          <Icon name="ios-alert" size={32} /> No Products found
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={data}
      style={{ flex: 1 }}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  );
};

class Categories extends React.Component {
  _isMounted = false;
  state = {
    selected: "",
    selectedObj: null,
    cats: [],
    id: 1,
  };

  changeCategory = (category) => {
    // console.log('category', category);
    this.setState({
      selected: category.name,
      id: category.id,
      selectedObj: category,
    });
  };
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      const cats = this.props.categories.map((item) => item.name);
      // console.log(cats);
      this.setState({
        selected: this.props.categories[0].name,
        selectedObj: this.props.categories[0],
        cats,
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { theme, navigation, categories } = this.props;
    const { colors } = theme;
    const { selected, id, selectedObj, cats } = this.state;
    // console.log(
    //   "find",
    //   cats.find((item) => item === selected)
    // );
    console.log("selected", selected);
    return (
      <Container dark={theme.dark ? true : false}>
        <StatusBar
          backgroundColor={theme.dark ? "#333" : "#fff"}
          barStyle={theme.dark ? "default" : "dark-content"}
        />
        <View
          style={{
            backgroundColor: theme.dark ? "#333" : "#fff",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon.Button
              name="ios-menu"
              // style={{bordebott: 120}}
              size={32}
              color={theme.dark ? "#fff" : "#333"}
              backgroundColor={theme.dark ? "#333" : "#fff"}
              onPress={() => navigation.openDrawer()}
            />
            <Text
              style={{
                fontSize: 32,
                marginBottom: 12,
                marginTop: 10,
                color: theme.dark ? "#fff" : "#333",
              }}
            >
              Categories
            </Text>
          </View>

          <CartIcon dark={theme.dark ? true : false} color="#333" />
        </View>

        <CategoriesList horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => {
            return (
              <Category
                key={index}
                onPress={() => this.changeCategory(category)}
              >
                <CategoryName
                  dark={theme.dark ? true : false}
                  selected={selected === category.name ? true : false}
                >
                  {category.name}
                </CategoryName>
                {selected === category.name && <CategoryDot />}
              </Category>
            );
          })}
        </CategoriesList>

        {/* {selectedObj === categories.find(item => item.names === selected) && (
          <All id={id} data={this.props.categories} />
        )} */}
        {cats.length > 0 &&
          cats.map((item, index) => {
            // console.log(item);
            if (item === selected) {
              return <All id={id} key={index} />;
            }
          })}
        {/* {selected === cats.find(item => item === selected) ? (
          <All id={id} />
        ) : null} */}
        {/* {selected === 'BBQ' ? <All id={id} /> : null}
        {selected === 'Pizza' ? <All id={id} /> : null} */}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  console.log("state", state.categories);
  return {
    categories: state.category.categories,
  };
};

export default connect(mapStateToProps, null)(withTheme(Categories));
