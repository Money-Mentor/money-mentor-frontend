import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { connect } from 'react-redux';
import Button from 'react-native-button';

import { sendToken } from '../store/token';

class Link extends React.Component {
  state = {
    data: {},
    status: 'LOGIN_BUTTON',
  };

  render() {
    console.log(this.state.status);

    switch (this.state.status) {
      case 'CONNECTED':
        console.log('connected');
        return this.renderDetails();
      case 'LOGIN_BUTTON':
      case 'EXIT':
        return this.renderButton();
      default:
        return this.renderLogin();
    }
  }

  renderButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ status: '' })}>
          <Text style={styles.paragraph}>Login with Plaid</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onLoadStart = props => {
    console.log('onLoadStart', props);
  };

  onLoad = props => {
    console.log('onLoad', props);
  };

  onLoadEnd = props => {
    console.log('onLoadEnd', props);
  };

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="bc8a1ae90c8899639cdfd58c69af10"
        env="sandbox"
        product="auth,transactions"
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      />
    );
  }

  renderDetails() {
    this.props.dispatchedSendToken(this.state.data.metadata.public_token);

    return (
      <View style={styles.container}>
        <Text>You linked your bank account successfully!</Text>
        <Button
        onPress={() =>
          this.props.navigation.navigate('Quiz', { title: 'Quiz' })
        }
        >
          Let's get started!
        </Button>
      </View>
    );
  }

  onMessage = data => {
    this.setState({
      data,
      status: data.action
        .substr(data.action.lastIndexOf(':') + 1)
        .toUpperCase(),
    });
    console.log('this.state onMessage handler', this.state);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  value: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

const mapDispatch = dispatch => {
  return {
    dispatchedSendToken: token => dispatch(sendToken(token)),
  };
};

export default connect(
  null,
  mapDispatch
)(Link);
