import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { questions } from "../data";

export default class Quiz extends React.Component {
  constructor() {
    this.state = {
      questions,
      currentQuestion: [] // => [5, 3]
    };
    // this.randomQuestion = this.randomQuestion.bind(this)
  }

  randomQuestion() {
    const random = Math.floor(Math.random() * questions.length);
    if (!currentQuestion[random]) {
      // currentQuestion.push(random);
      this.setState({
        currentQuestion: [...currentQuestion, random]
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.questions.map(question => {
          this.randomQuestion();
          return (
            {
              if (this.state.questions[x].id === this.currentQuestion[this.currentQuestion.length - 1]) {

              }
            }
            <View>
              <Text>
                {
                  this.state.questions[
                    this.currentQuestion[this.currentQuestion.length - 1]
                  ].question
                }
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
    textAlign: "center"
  },

  button: {
    backgroundColor: "#4f9b94",
    borderRadius: 25,
    width: 300,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  }
});
