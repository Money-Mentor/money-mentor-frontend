import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Slider from 'react-native-slider';
import { questions } from '../data';
import { shuffle } from '../common';
import Result from './Result';

export default class Quiz extends Component {
  constructor() {
    super();

    const shuffledQuestions = shuffle(questions);
    const firstQuestion = shuffledQuestions[0];

    this.state = {
      questions: shuffledQuestions,
      question: firstQuestion.question,
      personality: firstQuestion.personality,
      result: {
        'Social Value Spender': 0,
        'Cash Splasher': 0,
        Hoarder: 0,
        Ostrich: 0
      },
      value: 0
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  nextQuestion(event) {
    const nextState = { ...this.state };
    const lastQuestion = nextState.questions.pop();
    nextState.question =
      lastQuestion && nextState.questions.length >= 2
        ? lastQuestion.question
        : null;
    this.setState(nextState);
  }

  handleResult() {
    const personality = this.state.personality;
    const value = this.state.value;
    console.log('this should be the set value!!!!!', value);

    const result = { ...this.state.result };
    console.log('result *****', result);
    result[personality] += value;
    console.log('this should be new sum *****', result[personality]);
    this.setState({ result: result }, () => {
      console.log(this.state);
    });
  }

  static navigationOptions = {
    title: 'Quiz'
  };

  render() {
    const questionView = (
      <View>
        <Text>{this.state.question}</Text>
        {/* <Text style={styles.leftValue}>Strongly Disagree</Text>
        <Text style={styles.center}>Neutral</Text>
        <Text style={styles.rightValue}>Strongly Agree</Text> */}
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          step={1}
          minimumValue={-3}
          maximumValue={3}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.handleResult();
            this.nextQuestion();
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        {this.state.question === null ? <Result /> : questionView}
      </View>
    );
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
  },

  leftValue: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  rightValue: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  center: {
    flex: 1,
    alignItems: 'center'
  }
});
