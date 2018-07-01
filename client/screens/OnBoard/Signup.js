import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/user';
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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
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
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.logoLocation}>
          <Image
            style={styles.logo}
            source={require('../../../public/img/animatedLogo.gif')}
          />
          <Text style={styles.h1}>Signup</Text>
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
            title={`Submit`}
            onPress={() => {
              this.props.handleSubmit(this.state.email, this.state.password);

              this.props.navigation.navigate('Link', { title: 'Link' });
            }}
          >
            Submit
          </Button>
        </View>
      </KeyboardAvoidingView>
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

// Be consistent with styling - styling in one condensed place, easier to read
