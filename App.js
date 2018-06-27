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
  Result,
  Navbar,
  Accounts,
  BudgetSetup,
  EditCategories,
  Individual,
  IndividualAccount
} from "./client";

// import Home from './client/screens/Home'
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { Provider } from 'react-redux';

// import { createStackNavigator } from 'react-navigation';

// import store from './client/store/index';
// import Quiz from './client/screens/Quiz';
// import Link from './client/screens/Link';
// import Initial from './client/screens/Initial';
// import Login from './client/screens/Login';
// import Signup from './client/screens/Signup';
// import Home from './client/screens/Home';
// import AccountsOverview from './client/screens/AccountsOverview';
// import Result from './client/screens/Result';
// import BudgetSetup from './client/screens/BudgetSetup';
// import EditCategories from './client/screens/EditCategories';
// import IndividualAccount from './client/screens/IndividualAccount';

import { Font } from "expo";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
      logo: require("./public/fonts/logo.otf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.fontLoaded ? (
          <AppStackNavigator />
        ) : (
          <View>
            <Text>Loading..</Text>
          </View>
        )}
      </Provider>
    );
  }
}

const AppStackNavigator = createStackNavigator({
  // On Board
  Inital: { screen: Initial },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Link: { screen: Link },
  Quiz: { screen: Quiz },
  Result: { screen: Result },
  BudgetSetup: { screen: BudgetSetup },

  Navbar: { screen: Navbar },
  Main: { screen: Main },
  Home: { screen: Home },

  //Accounts
  Accounts: { screen: props => <Accounts {...props} navigation={this.props.navigation}/> },
  Individual: { screen: Individual },
  IndividualAccount: { screen: IndividualAccount },
  EditCategories: { screen: EditCategories },
});

