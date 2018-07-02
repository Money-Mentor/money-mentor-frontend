import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/user';
import { sendToken } from '../../store/token';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Keyboard,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import {
  styles,
  colorTheme,
  IMAGE_HEIGHT,
  IMAGE_HEIGHT_SMALL,
} from '../../common/styles';
import PlaidAuthenticator from 'react-native-plaid-link';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      status: 'LOGIN_BUTTON',
      data: {}
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.onMessage = this.onMessage.bind(this);
  }
  static navigationOptions = {
    title: 'Money Mentor',
    headerStyle: { backgroundColor: colorTheme.blue.medium },
    headerTitleStyle: { color: colorTheme.white.snow },
  };
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    if (this.state.status === 'CONNECTED') {
      this.props.sendToken(this.state.data.metadata.public_token);

      this.props.navigation.navigate("BudgetSetup", {
        title: "BudgetSetup"
      });
      return null;
    } else if (this.state.status === 'LOGIN_BUTTON') {
      return this.renderSignUp();
    } else {
      return this.renderPlaid();
    }
  }

  renderSignUp() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

        <View style={styles.logoLocation}>
        <Animated.View style={{ height: this.imageHeight }}>
  <Image style={styles.logo} source={require('../../../public/img/logo2.gif')} />
      </ Animated.View>
          <Text style={styles.h1}>sign up</Text>

        </View>
        <View style={{ padding: 90 }} />
        <TextInput
          style={styles.formContainer}
          autoCapitalize="none"
          placeholderTextColor={colorTheme.white.snow}
          onChangeText={text =>
            this.setState({
              email: text,
            })
          }
          value={this.state.email}
          placeholder="   Email"
        />
        <TextInput
          style={styles.formContainer}
          autoCapitalize="none"
          onChangeText={text =>
            this.setState({
              password: text,
            })
          }
          placeholderTextColor={colorTheme.white.snow}
          value={this.state.password}
          placeholder="   Password"
          secureTextEntry={true}
          ref={input => (this.password = input)}
        />
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.bluebutton}
            textStyle={{ textAlign: 'center' }}
            title={`Link Bank Account →`}
            onPress={async () => {
              await this.props.handleSubmit(this.state.email, this.state.password);

              await this.setState({ status: 'PLAID' })
            }}
          />


        </View>

      </KeyboardAvoidingView>
    );
  }

  renderPlaid() {
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

  onMessage = data => {
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
    });
  };
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(email, password) {
      dispatch(signup(email, password));
    },
    sendToken: token => dispatch(sendToken(token))
  };
};

export default connect(
  null,
  mapDispatch
)(Signup);

// Be consistent with styling - styling in one condensed place, easier to read
