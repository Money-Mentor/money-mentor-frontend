import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../../common/styles';


class Initial extends Component {
  static navigationOptions = {
    headerStyle: styles.headerStyle
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.initialLogoLocation}>
          <Image
            style={styles.logo}
            source={require('../../../public/img/logo2.png')}
          />
          <Text style={styles.initialScreenText}>MONEY</Text>
          <Text style={styles.initialScreenTextSecondLine}>MENTOR</Text>
        </View>
        <View style={styles.initialButtonLocation}>
        <View style={{
        padding: 10}}>
          <Button
            raised
            buttonStyle={styles.orangebutton}
            textStyle={styles.buttontext}
            title={`Login`}
            onPress={() =>
              this.props.navigation.navigate('Login', { title: 'Login' })
            }
          >
          </Button>
        </View>
        <View style={{
        padding: 10}}>
          <Button
            raised
            buttonStyle={styles.orangebutton}
            textStyle={styles.buttontext}
            title={`Signup`}
            onPress={() =>
              this.props.navigation.navigate('Signup', { title: 'Signup' })
            }
          >
          </Button>
        </View>
        </View>
      </View>
    );
  }
}

export default Initial;
