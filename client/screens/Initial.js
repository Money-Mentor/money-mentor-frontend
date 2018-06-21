import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';

const Initial = props => {
  return (
    <View>
      <Text>Money Mentor</Text>
      <Button
        raised
        buttonStyle={{ backgroundColor: '#118C8B', borderRadius: 10 }}
        textStyle={{ textAlign: 'center' }}
        title={`Login`}
        onPress={() => props.navigation.navigate('Login', { title: 'Login' })}
      >
        Login
      </Button>
      <Button
        raised
        buttonStyle={{ backgroundColor: '#118C8B', borderRadius: 10 }}
        textStyle={{ textAlign: 'center' }}
        title={`Signup`}
        onPress={() => props.navigation.navigate('Signup', { title: 'Signup' })}
      >
        Signup
      </Button>
    </View>
  );
};

export default Initial;
