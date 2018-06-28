import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import store from './client/store/index';

import {
  Link,
  Initial,
  Login,
  Signup,
  BudgetSetup,
  EditCategories,
  Navbar,
} from './client';

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
          <AppNavigator  />
        ) : (
          <View>
            <Text>Loading..</Text>
          </View>
        )}
      </Provider>
    );
  }
}

const AuthenticationNavigator = createStackNavigator({
  Inital: { screen: Initial },
  Login: { screen: Login },
  Signup: { screen: Signup },
  Link: { screen: Link },
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories },
});

const AppNavigator = createSwitchNavigator({
  Auth: { screen: AuthenticationNavigator },
  Main: { screen: Navbar },
});
