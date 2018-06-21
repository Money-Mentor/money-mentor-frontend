import React, { Componenet } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';

const Signup = props => {
  return (
    <View>
      <Text>Signup</Text>
      <Button
        onPress={() => props.navigation.navigate('Signup', { title: 'Signup' })}
      >
        Signup
      </Button>
    </View>
  );
};

export default Signup;
