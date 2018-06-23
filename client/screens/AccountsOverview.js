import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

export default class AccountsOverview extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Account Overview</Text>
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
