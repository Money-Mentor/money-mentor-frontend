import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

export default class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
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
