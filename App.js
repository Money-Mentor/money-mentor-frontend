import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { createStackNavigator } from "react-navigation";

import store from "./client/store/index";
// import Signup from "./client/screens/signup";

import {
  Quiz,
  Link,
  Initial,
  Login,
  Signup,
  Home,
  Main,
  AccountsOverview,
  Result,
  Navbar
} from "./client";

export default class App extends React.Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Inital: { screen: Initial },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Link: { screen: Link },
  Quiz: { screen: Quiz },
  Navbar: { screen: Navbar },
  Main: { screen: Main },
  Home: { screen: Home },
  AccountsOverview: { screen: AccountsOverview },
  Result: { screen: Result },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
