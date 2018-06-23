import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../store/user';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View>
        <Text>Signup</Text>
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={text =>
            this.setState({
              email: text
            })
          }
          value={this.state.email}
          placeholder="Email"
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          onChangeText={text =>
            this.setState({
              password: text
            })
          }
          value={this.state.password}
          placeholder="Password"
          secureTextEntry={true}
          ref={input => (this.password = input)}
        />
        <Button
          raised
          buttonStyle={{ backgroundColor: '#118C8B', borderRadius: 10 }}
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
    );
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(email, password) {
      dispatch(signup(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(Signup);
