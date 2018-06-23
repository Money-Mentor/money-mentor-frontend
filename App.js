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

export default class App extends React.Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>

      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      //   <Text>Shake your phone to open the developer menu.</Text>
      // </View>
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
  Result: { screen: Result }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
