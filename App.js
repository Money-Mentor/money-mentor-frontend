import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import store from './client/store/index';

import {
  Link,
  Initial,
  Login,
  Signup,
  BudgetSetup,
  EditCategories,
  Navbar
} from './client';

import { Font } from 'expo';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    await Font.loadAsync({
    poppinsExtraLight : require('./public/fonts/Poppins/Poppins-ExtraLight.ttf'),
      poppinsRegular: require('./public/fonts/Poppins/Poppins-Regular.ttf'),
      poppinsBold: require('./public/fonts/Poppins/Poppins-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.fontLoaded ? (
          <AppNavigator />
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
  EditCategories: { screen: EditCategories }
});

const AppNavigator = createSwitchNavigator({
  Auth: { screen: AuthenticationNavigator },
  Main: { screen: Navbar }
});
