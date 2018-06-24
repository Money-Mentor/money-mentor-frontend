import React from 'react';
import { Text, View } from 'react-native';
import {Home, Accounts, Budget, Profile} from '../'
import createMaterialBottomTabNavigator from 'react-navigation-material-bottom-tabs';


export default createMaterialBottomTabNavigator({
  Home: { screen: Home },
  Budget: { screen: Budget },
  Accounts: { screen: Accounts },
  Profile: { screen: Profile },
}, {
  initialRouteName: 'Album',
  activeTintColor: '#f0edf6',
  inactiveTintColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});

