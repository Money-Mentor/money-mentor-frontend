import React, { Componenet } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

const Login = props => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        onPress={() => props.navigation.navigate('Signup', { title: 'Signup' })}
      >
        Login
      </Button>
    </View>
  );
};
export default Login;
