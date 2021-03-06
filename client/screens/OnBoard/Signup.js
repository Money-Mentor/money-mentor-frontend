import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/user';
import {
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import {
  styles,
  colorTheme,
  IMAGE_HEIGHT,
  IMAGE_HEIGHT_SMALL
} from '../../common/styles';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }
  static navigationOptions = {
    title: 'Money Mentor',
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow }
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
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start();
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoLocation}>
          <Animated.Image
            source={require('../../../public/img/logo2.png')}
            style={[styles.animatedLogo, { height: this.imageHeight }]}
          />
          <Text style={styles.h1}>SIGN UP</Text>
        </View>
        <View style={{ padding: 90 }} />
        <TextInput
         underlineColorAndroid="transparent"
          style={styles.formContainer}
          autoCapitalize="none"
          placeholderTextColor={colorTheme.white.snow}
          onChangeText={text =>
            this.setState({
              email: text
            })
          }
          value={this.state.email}
          placeholder="Email"
        />
        <TextInput
         underlineColorAndroid="transparent"
          style={styles.formContainer}
          autoCapitalize="none"
          onChangeText={text =>
            this.setState({
              password: text
            })
          }
          placeholderTextColor={colorTheme.white.snow}
          value={this.state.password}
          placeholder="Password"
          secureTextEntry={true}
          ref={input => (this.password = input)}
        />
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.bluebutton}
            textStyle={{ textAlign: 'center' }}
            title={`Link Bank Account →`}
            onPress={() => {
              this.props.handleSubmit(this.state.email, this.state.password);
              this.props.navigation.navigate('Link', { title: 'Link' });
            }}
          >
            Submit
          </Button>
        </View>
        <View style={{ height: 300 }} />
      </KeyboardAvoidingView>
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
