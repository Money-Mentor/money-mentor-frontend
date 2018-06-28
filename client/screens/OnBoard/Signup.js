import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/user';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button
} from 'react-native-elements';
import { styles } from '../../common/styles';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoLocation}>
          <Image style={styles.logo} source={require('../../../public/img/logo.png')} />
          <Text style={styles.initialScreenText}>Signup</Text>
        </View>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 10 }}
          inputStyle={styles.formInput}
          onChangeText={text =>
            this.setState({
              email: text
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
              password: text
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
    handleSubmit(email, password) {
      dispatch(signup(email, password));
    }
  };
};

export default connect(
  null,
  mapDispatch
)(Signup);

// Be consistent with styling - styling in one condensed place, easier to read
