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

import { Font, Permissions, Notifications } from 'expo';

// ----------------- Push Notifications --------------------------
async function registerForPushNotificationsAsync() {
  // Remote notifications don't work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  console.log('status=============================================', status);

  if (status !== 'granted') {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  console.log('Our token ==========================================', token);
  /// Send this to a server
}

// import { Font } from 'expo';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false
    };
  }
  async componentDidMount() {
    // listener for push notificaiton
    registerForPushNotificationsAsync();
    this.listener = Notifications.addListener(this.handleNotification);

    await Font.loadAsync({
      logo: require('./public/fonts/logo.otf')
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
  Link: { screen: Link },
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories }
});

const AppNavigator = createSwitchNavigator({
  Auth: { screen: AuthenticationNavigator },
  Main: { screen: Navbar }
});
