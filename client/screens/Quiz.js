import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import { questions } from '../data'
import 'expo'
import { shuffle } from '../common'
import Result from './Result'

export default class Quiz extends React.Component {
  constructor() {
    super()
    this.state = {
      questions: shuffle(questions),
      question: questions.pop().question
    }
    this.nextQuestion = this.nextQuestion.bind(this)
  }

  nextQuestion(event) {
    const nextState = { ...this.state }
    nextState.question = nextState.questions.pop()
      ? nextState.questions.pop().question
      : null

    this.setState(nextState)
  }

  static navigationOptions = {
    title: 'Quiz'
  }

  render() {
    const questionView = (
      <View>
        <Text>{this.state.question}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.nextQuestion()}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    )

    return (
      <View style={styles.container}>
        {this.state.question === null ? <Result /> : questionView}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputBox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    textAlign: 'center'
  },

  button: {
    backgroundColor: '#4f9b94',
    borderRadius: 25,
    width: 300,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
})
