import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setBudget } from '../../store';
import { styles, colorTheme, deviceWidth } from '../../common/styles';

class BudgetSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 1,
      income: 0,
      staticCosts: 0,
      savings: 0,
      spendingBudget: 0
    };
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium }
  };

  render() {

    const questions = [
      {
        question: 'What is your monthly income?',
        textInput: income => this.setState({ income: +income }),
        button: () =>
          this.setState({ question: 2 })
      },
      {
        question: 'What are your monthly static costs?',
        textInput: staticCosts =>
        this.setState({ staticCosts: +staticCosts }),
        button: () => this.setState({ question: 3 })
      },
      {
        question: 'How much would you like to save each month?',
        textInput: savings => this.setState({ savings: +savings }),
        button: () => {
          const spendingBudget =
            this.state.income - this.state.staticCosts - this.state.savings;
          this.props.setBudget({ ...this.state, spendingBudget });
          this.props.navigation.navigate('EditCategories', {
            title: 'EditCategories'
          });
        }
      }

    ]

    const questionFx = question => (
      <View style={styles.busgetSetupContainer}>
        <Text style={styles.budgetSetupText}>
          {question.question}
        </Text>
        <View style={styles.budgetContainer}>
          <TextInput
            style={styles.budgetInput}
            placeholderTextColor={colorTheme.white.snow}
            onChangeText={question.textInput}
            placeholder=""
          />

          <Button
            raised
            buttonStyle={styles.bugetSetupButton}
            textStyle={{ textAlign: 'center' }}
            title={`→`}
            onPress={question.button}
          />
        </View>
      </View>
    );

    let question;

    if (this.state.question === 1) {
      question = questionFx(questions[0])
    } else if (this.state.question === 2) {
      question = questionFx(questions[1])
    } else {
      question = questionFx(questions[2])
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require('../../../public/img/speech.png')}
          style={{ width: deviceWidth, position: 'absolute', top: -2 }}
        />
        <Animated.Image
          source={require('../../../public/img/logo2.png')}
          style={{ position: 'absolute', bottom: -50, left: -200 }}
        />
        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Text style={[styles.h1, { textAlign: 'right' }]}>
            Talk to me{'\n'}about your{'\n'}finances
          </Text>
        </View>

        {question}
      </KeyboardAvoidingView>
    );
  }
}

const mapState = state => {
  return {
    budget: state.budget
  };
};

const mapDispatch = dispatch => {
  return {
    setBudget: budget => dispatch(setBudget(budget))
  };
};

export default connect(
  mapState,
  mapDispatch
)(BudgetSetup);
