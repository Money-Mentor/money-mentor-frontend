import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Slider from 'react-native-slider';
import { questions } from '../data';
import { shuffle } from '../common';
import { connect } from 'react-redux';
import { getQuizPersonality } from '../store/personality';
import personality from '../personality';

class Quiz extends Component {
  constructor() {
    super();
    const shuffledQuestions = shuffle(questions);
    this.state = {
      questions: shuffledQuestions,
      question: shuffledQuestions[0].question,
      personality: shuffledQuestions[0].personality,
      result: {
        'Social Value Spender': 0,
        'Cash Splasher': 0,
        Hoarder: 0,
        Ostrich: 0,
      },
      value: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.state.questions.shift();
    const newQuestions = this.state.questions;

    if (this.state.questions.length > 0) {
      const newQuestion = newQuestions[0].question;
      const newPersonality = newQuestions[0].personality;

      const personality = this.state.personality;
      const currValue = this.state.value;
      const newValue = this.state.result[personality] + currValue;
      const newResult = { ...this.state.result, [personality]: newValue };

      this.setState({
        questions: newQuestions,
        question: newQuestion,
        personality: newPersonality,
        result: newResult,
        value: 0,
      });
    } else {
      const quizPersonality = personality(this.state.result);

      this.props.dispatchedGetQuiz(quizPersonality);
      this.props.navigation.navigate('Result', { title: 'Result' });
    }
  }

  static navigationOptions = {
    title: 'Quiz',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', padding: 40 }}>
          <Image source={require('../../public/img/logo.png')} />
        </View>
        <Text style={styles.text}>{this.state.question}</Text>
        <Slider
          style={styles.slider}
          value={this.state.value}
          defaultValue={0}
          onValueChange={value => this.setState({ value })}
          step={1}
          minimumValue={-3}
          maximumValue={3}
        />
        <Button
          raised
          buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
          textStyle={{ textAlign: 'center' }}
          title={`Next`}
          style={styles.button}
          onPress={() => {
            this.nextQuestion();
          }}
        >
          Next
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#C2D3DA',
  },
  text: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#585A56',
    fontWeight: 'bold',
    fontSize: 20,
    width: '80%',
  },
  slider: {
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  inputBox: {
    width: 200,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
    textAlign: 'center',
  },

  button: {
    width: 150,
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

  leftValue: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  rightValue: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
});

const mapDispatch = dispatch => {
  return {
    dispatchedGetQuiz: result => dispatch(getQuizPersonality(result)),
  };
};

export default connect(
  null,
  mapDispatch
)(Quiz);
