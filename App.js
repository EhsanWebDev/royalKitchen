import "react-native-gesture-handler";
import React from "react";
import { View } from "react-native";

import { Provider } from "react-redux";

import { applyMiddleware, createStore } from "redux";
import reducer from "./src/store/reducers";
import logger from "redux-logger";
import thunk from "redux-thunk";
import Navigation from "./screens/Navigation";
const store = createStore(reducer, {}, applyMiddleware(logger, thunk));

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState] = React.useReducer(loginReducer, initialLoginState);

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    </Provider>
  );
};

export default App;
