import React from 'react';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import store from './client/store/index';

import {
  Initial,
  Login,
  Signup,
  BudgetSetup,
  EditCategories,
  Navbar,
} from './client';

import { Font, Permissions, Notifications } from 'expo';

// ----------------- Push Notifications --------------------------
async function registerForPushNotificationsAsync() {
  // Remote notifications don't work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== 'granted') {
    return;
  }
}

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
    };
  }
  async componentDidMount() {
    // listener for push notificaiton
    registerForPushNotificationsAsync();
    this.listener = Notifications.addListener(this.handleNotification);

    await Font.loadAsync({
      poppinsExtraLight: require('./public/fonts/Poppins/Poppins-ExtraLight.ttf'),
      poppinsRegular: require('./public/fonts/Poppins/Poppins-Regular.ttf'),
      poppinsBold: require('./public/fonts/Poppins/Poppins-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  // remove listener for push notification
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  // handles push notification
  handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };

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
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories },
});

const AppNavigator = createSwitchNavigator({
  Auth: { screen: AuthenticationNavigator },
  Main: { screen: Navbar },
});
