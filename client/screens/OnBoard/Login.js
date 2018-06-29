import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../store/user';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import { styles, colorTheme } from '../../common/styles';

import { Notifications } from 'expo';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }
  static navigationOptions = {
    title: 'Money Mentor',
    headerStyle: { backgroundColor: colorTheme.blue.medium },
    headerTitleStyle: { color: colorTheme.grey.dark },
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoLocation}>
          <Image source={require('../../../public/img/logo.png')} />
          <Text style={styles.h1}>Login</Text>
        </View>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 10 }}
          inputStyle={styles.formInput}
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
          placeholder="   Email"
        />
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 10 }}
          inputStyle={styles.formInput}
          leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
          placeholder="   Password"
          secureTextEntry={true}
          ref={input => (this.password = input)}
        />
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.button}
            textStyle={{ textAlign: 'center' }}
            title={`Submit`}
            onPress={() => {
              this.props.handleSubmit(this.state.email, this.state.password, this.props.navigation);
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

// const mapState = state => {
//   pushToken: // WHERE IS IT???
// }

const mapDispatch = dispatch => {
  return {
    handleSubmit: async (email, password, navigation) => {
      let pushToken = await Notifications.getExpoPushTokenAsync();
      dispatch(login(email, password, pushToken, navigation));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(Login);
