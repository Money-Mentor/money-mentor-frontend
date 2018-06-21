import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.input = '';
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(formData) {
    formData.email;
    formData.password;
  }
  render() {
    return (
      <View>
        <Text>Login</Text>
        <FormLabel>Email</FormLabel>
        <FormInput
          ref={input => (this.input = input)}
          onChangeText={this.handleChange}
        />
        <FormValidationMessage>
          {'This field is required'}
        </FormValidationMessage>
        <Button
          raised
          buttonStyle={{ backgroundColor: '#118C8B', borderRadius: 10 }}
          textStyle={{ textAlign: 'center' }}
          title={`Signup`}
          onPress={() =>
            this.props.navigation.navigate('Signup', { title: 'Signup' })
          }
        >
          Login
        </Button>
      </View>
    );
  }
}
