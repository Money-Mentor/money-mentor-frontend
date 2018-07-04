import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Slider from 'react-native-slider';
import { questions } from '../../data';
import { shuffle, personality } from '../../common';
import { connect } from 'react-redux';
import { getQuizPersonality } from '../../store/personality';
import { styles, colorTheme } from '../../common/styles';

class Quiz extends Component {
  constructor() {
    super();
    const shuffledQuestions = shuffle(questions);
    this.state = {
      questions: shuffledQuestions,
      question: shuffledQuestions[0].question,
      personality: shuffledQuestions[0].personality,
      // prettier-ignore
      result: {
        'Social Value Spender': 0,
        'Cash Splasher': 0,
        'Hoarder': 0,
        'Ostrich': 0
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
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow },
  };

  render() {
    return (
      <View style={styles.questionContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={styles.logo}
            source={require('../../../public/img/logo2.png')}
          />
        </View>
        <Text style={styles.questionText}>{this.state.question}</Text>
        <Slider
          trackStyle={styles.track}
          thumbStyle={styles.thumb}
          minimumTrackTintColor={colorTheme.orange.medium}
          maximumTrackTintColor="#b7b7b7"
          style={styles.slider}
          value={this.state.value}
          defaultValue={0}
          onValueChange={value => this.setState({ value })}
          step={1}
          minimumValue={-3}
          maximumValue={3}
        />
        <View style={styles.sliderTextAlign}>
          <View>
            <Text style={styles.sliderSmallText}> Strongly</Text>
            <Text style={styles.sliderSmallText}> Disagree</Text>
          </View>

          <View>
            <Text style={styles.sliderSmallText}> Neutral /</Text>
            <Text style={styles.sliderSmallText}> Not Sure</Text>
          </View>
          <View>
            <Text style={styles.sliderSmallText}> Strongly</Text>
            <Text style={styles.sliderSmallText}> Agree</Text>
          </View>
        </View>
        <Button
          raised
          buttonStyle={styles.bluebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Next`}
          style={styles.questionButton}
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

const mapDispatch = dispatch => {
  return {
    dispatchedGetQuiz: result => dispatch(getQuizPersonality(result)),
  };
};

export default connect(
  null,
  mapDispatch
)(Quiz);
