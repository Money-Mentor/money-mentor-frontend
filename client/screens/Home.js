import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";

export default class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <Button
          raised
          buttonStyle={{ backgroundColor: '#118C8B', borderRadius: 10 }}
          textStyle={{ textAlign: 'center' }}
          title={`Go To Account Overview`}
          onPress={() => {
            this.props.navigation.navigate('AccountsOverview', { title: 'AccountsOverview' });
          }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
