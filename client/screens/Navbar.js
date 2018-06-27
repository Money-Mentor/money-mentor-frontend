import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { Home, Accounts, Budget, Profile } from "../";
import Home from './Home';
import Budget from './Budget';
import Accounts from './Accounts';
import Profile from './Profile';
import { AccountStack } from './Accounts';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const homeIcon = ({ tintColor }) => (
  <Icon name="home" size={25} color={tintColor} />
);
const budgetIcon = ({ tintColor }) => (
  <Icon name="dollar" size={25} color={tintColor} />
);
const accountsIcon = ({ tintColor }) => (
  <Icon name="university" size={25} color={tintColor} />
);
const profileIcon = ({ tintColor }) => (
  <Icon name="user" size={25} color={tintColor} />
);

const Navbar = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: homeIcon,
      },
    },
    Budget: {
      screen: Budget,
      navigationOptions: {
        tabBarIcon: budgetIcon,
      },
    },
    Accounts: {
      screen: AccountStack,
      navigationOptions: {
        tabBarIcon: accountsIcon,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: profileIcon,
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeTintColor: '#efcdba',
    inactiveTintColor: '#FFFFFF',
    barStyle: { backgroundColor: '#7CA5B8' },
  }
);

export default Navbar;
