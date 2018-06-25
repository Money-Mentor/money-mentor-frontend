import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../store/user';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Signup</Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 10 }}
          inputStyle={{
            height: 60,
            borderColor: '#92B1BD',
            borderWidth: 2,
            borderRadius: 15,
            width: '100%',
          }}
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
          inputStyle={{
            height: 60,
            borderColor: '#92B1BD',
            borderWidth: 2,
            borderRadius: 15,
            width: '100%',
          }}
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
            buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
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
    handleSubmit(email, password) {
      dispatch(signup(email, password));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(Signup);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C2D3DA',
  },
});
