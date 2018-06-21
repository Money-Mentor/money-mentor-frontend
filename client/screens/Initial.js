import React, { Componenet } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

const Initial = props => {
  return (
    <View>
      <Text> Money Mentor</Text>
      <Button
        onPress={() => props.navigation.navigate('Login', { title: 'Login' })}
      >
        Login
      </Button>
      <Button
        onPress={() => props.navigation.navigate('Signup', { title: 'Signup' })}
      >
        Signup
      </Button>
    </View>
  );
};

export default Initial;
