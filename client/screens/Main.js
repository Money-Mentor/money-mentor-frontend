import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAcctTransData } from "../store";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { Navbar, Home } from "../";

class Main extends React.Component {
  render() {
    return <Navbar />;
  }
}

export default Main;
