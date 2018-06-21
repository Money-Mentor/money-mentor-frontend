import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

export default class Signup extends Component {
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
        <Text>Signup</Text>
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
          title={`Login`}
          onPress={() =>
            this.props.navigation.navigate('Signup', { title: 'Signup' })
          }
        >
          Signup
        </Button>
      </View>
    );
  }
}
