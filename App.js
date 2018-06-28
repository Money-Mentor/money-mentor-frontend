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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
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
