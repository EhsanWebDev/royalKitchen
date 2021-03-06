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
  font-size: ${(props) => (props.selected ? "14px" : "12px")};
  color: ${(props) => (props.dark ? "#fff" : "#333")};
  font-weight: ${(props) => (props.selected ? "bold" : "100")};
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
    console.log("My Props ---->", props.id);
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
        alert("error occurred");
        console.log(res.data);
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
    this.props.dispatch({
      type: "CAT_SELECT",
      payload: category,
    });
    this.setState({
      // selected: category.name,
      id: category.id,
      selectedObj: category,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    console.log("selected", this.props.selector);
    if (this._isMounted) {
      // console.log("props", );
      if (this.props.route.params) {
        console.log(this.props.route.params.title);
      }
      const cats =
        this.props.categories && this.props.categories.map((item) => item.name);
      this.props.dispatch({
        type: "CAT_SELECT",
        payload: this.props.categories[0],
      });
      // var index;

      // index =
      //   this.props.categories &&
      //   this.props.categories.findIndex((p) => p.id === this.props.selector.id);
      // alert(index);

      console.log("selected item", this.props.selector);
      // console.log(cats);
      // alert(
      //   this.props.categories.findIndex((p) => p.id === this.props.selector.id)
      // );
      this.setState({
        // selected: this.props.categories[0].name,
        selectedObj: this.props.categories[0],
        cats,
      });
      // let wait = new Promise((resolve) => setTimeout(resolve, 10)); // Smaller number should work
      // wait.then(() => {
      //   this.flatListRef.scrollTo({
      //     y: 0,
      //     x: Dimensions.get("screen").width,
      //     animated: true,
      //   });
      // });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  scrollToIndex = () => {
    // let randomIndex = Math.floor(
    //   Math.random(Date.now()) * this.props.data.length
    // );
    // this.flatListRef.current.scrollToIndex({ animated: true, index: 1 });
    // this.flatListRef.scrollTo({
    //   y: 0,
    //   x: Dimensions.get("screen").width * 2,
    //   animated: true,
    // });
  };

  render() {
    // this.scrollToIndex();
    const { theme, navigation, categories, selector } = this.props;

    const { colors } = theme;
    const { selected, id, selectedObj, cats } = this.state;
    // console.log(
    //   "find",
    //   cats.find((item) => item === selected)
    // );
    // console.log("selected", selected);
    if (!selector) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <Container dark={theme.dark ? true : false} style={{ paddingTop:this.props.user ? 0: 30}}>
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
            {this.props.user &&  <Icon.Button
              name="ios-menu"
              // style={{bordebott: 120}}
              size={32}
              color={theme.dark ? "#fff" : "#333"}
              backgroundColor={theme.dark ? "#333" : "#fff"}
              onPress={() => navigation.openDrawer()}
            />}
            
            <Text
              style={{
                fontSize: 24,
                marginBottom: 12,
                marginTop: 10,
                color: theme.dark ? "#fff" : "#333",
                paddingLeft: this.props.user ? 0 : 20
              }}
            >
              Categories
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 12,
                marginTop: 10,
                color: theme.dark ? "#fff" : "#333",
              }}
            >
              {this.props.route.params && this.props.route.params.title}
            </Text>
          </View>

          <CartIcon dark={theme.dark ? true : false} color="#333" />
        </View>
        {/* <Button onPress={this.scrollToIndex}>Index</Button> */}

        <CategoriesList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={(ref) => {
            this.flatListRef = ref;
          }}
        >
          {categories.map((category, index) => {
            return (
              <Category
                key={index}
                onPress={() => this.changeCategory(category)}
              >
                <CategoryName
                  dark={theme.dark ? true : false}
                  selected={
                    selector && selector.name === category.name ? true : false
                  }
                >
                  {category.name}
                </CategoryName>
                {selector && selector.name === category.name && <CategoryDot />}
              </Category>
            );
          })}
        </CategoriesList>

        {/* {selectedObj === categories.find(item => item.names === selected) && (
          <All id={id} data={this.props.categories} />
        )} */}
        {cats.length > 0 &&
          cats.map((item, index) => {
            console.log(selector && selector.id);
            if (item === selector.name) {
              return <All id={selector.id} key={index} />;
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
  // console.log("state", state.categories);
  return {
    categories: state.category.categories,
    selector: state.selector.selected,
     user: state.auth.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  dispatch,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Categories));
