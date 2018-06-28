import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PlaidAuthenticator from 'react-native-plaid-link';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { styles , colorTheme} from '../../common/styles';

import { sendToken } from '../../store/token';

class Link extends React.Component {
  state = {
    data: {},
    status: 'LOGIN_BUTTON'
  };
  static navigationOptions = {
    title: 'Money Mentor',
    headerStyle: { backgroundColor: colorTheme.blue.medium },
    headerTitleStyle: { color: colorTheme.grey.dark },
  }


  render() {
    switch (this.state.status) {
      case 'CONNECTED':
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
        <View style={styles.linkLogoLocation}>
          <Image style={styles.logo} source={require('../../../public/img/logo.png')} />
        </View>
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{ textAlign: 'center' }}
          title={`Let's Link Your Bank Account`}
          onPress={() => this.setState({ status: '' })}
        />
      </View>
    );
  };

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="bc8a1ae90c8899639cdfd58c69af10"
        env="sandbox"
        product="auth,transactions"
        clientName="MoneyMentor"
      />
    );
  }

  renderDetails() {
    this.props.sendToken(this.state.data.metadata.public_token);

    return (
      <View style={styles.container}>
        <View style={styles.logoLocation}>
          <Image style={styles.logo} source={require('../../../public/img/logo.png')} />
          <Text style={styles.initialScreenText}>Next Step: Take Our Quiz</Text>
        </View>
        <Button
          raised
          buttonStyle={styles.button}
          textStyle={{ textAlign: 'center' }}
          title={`Set Up Your Budget!`}
          onPress={() =>
            this.props.navigation.navigate('BudgetSetup', { title: 'BudgetSetup' })
          }
        />
      </View>
    );
  }

  onMessage = data => {
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
    });
  };
}

const mapDispatch = dispatch => {
  return {
    // rename to same thing - shorthand
    sendToken: token => dispatch(sendToken(token))
  };
};

export default connect(
  null,
  mapDispatch
)(Link);
