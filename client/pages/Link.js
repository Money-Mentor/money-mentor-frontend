import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

export default class Link extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>HELLLOOOOOOOOOOOOOO</Text>
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
