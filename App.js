import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import { createStackNavigator } from 'react-navigation';

import store from './client/store/index';
import Quiz from './client/screens/Quiz';
import Link from './client/screens/Link';
import Initial from './client/screens/Initial';
import Login from './client/screens/Login';
import Signup from './client/screens/Signup';
import Home from './client/screens/Home';
import AccountsOverview from './client/screens/AccountsOverview';
import Result from './client/screens/Result';
import BudgetSetup from './client/screens/BudgetSetup';
import EditCategories from './client/screens/EditCategories';
import IndividualAccount from './client/screens/IndividualAccount';
import CategoryPie from './client/screens/Home/CategoryPie'

export default class App extends React.Component {
  render() {
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
  Home: { screen: Home },
  AccountsOverview: { screen: AccountsOverview },
  Result: { screen: Result },
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories },
  IndividualAccount: { screen: IndividualAccount },
  CategoryPie: { screen: CategoryPie }
});
