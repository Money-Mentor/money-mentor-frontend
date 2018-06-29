import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/user';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import { styles, colorTheme } from '../../common/styles';

import { Notifications } from 'expo';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }
  static navigationOptions = {
    title: 'Money Mentor',
    headerStyle: { backgroundColor: colorTheme.blue.medium },
    headerTitleStyle: { color: colorTheme.grey.dark },
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoLocation}>
          <Image
            style={styles.logo}
            source={require('../../../public/img/logo.png')}
          />
          <Text style={styles.h1}>Signup</Text>
        </View>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 10 }}
          inputStyle={styles.formInput}
          onChangeText={text =>
            this.setState({
              email: text,
            })
          }
          value={this.state.email}
          placeholder="   Email"
        />
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 10 }}
          inputStyle={styles.formInput}
          onChangeText={text =>
            this.setState({
              password: text,
            })
          }
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
              this.props.handleSubmit(this.state.email, this.state.password);

              this.props.navigation.navigate('Link', { title: 'Link' });
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit: async (email, password) => {
      let pushToken = await Notifications.getExpoPushTokenAsync();
      dispatch(signup(email, password, pushToken));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(Signup);

// Be consistent with styling - styling in one condensed place, easier to read
