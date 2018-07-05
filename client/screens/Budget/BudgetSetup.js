import React from "react";
import { View, Text, TextInput, Image, Animated } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { setBudget } from "../../store";
import { styles, colorTheme, deviceWidth } from "../../common/styles";

class BudgetSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      question: 1,
      answer: 0,
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
        question: "What is your monthly income?",
        textInput: income => this.setState({ income: +income }),
        button: () => this.setState({ question: 2 }),
        placeholder: "exp. 5000"
      },
      {
        question: "What are your monthly static costs?",
        textInput: staticCosts => this.setState({ staticCosts: +staticCosts }),
        button: () => this.setState({ question: 3 }),
        placeholder: "exp. 1000"
      },
      {
        question: "How much would you like to save each month?",
        textInput: savings => this.setState({ savings: +savings }),
        button: () => {
          const spendingBudget =
            this.state.income - this.state.staticCosts - this.state.savings;
          this.props.setBudget({ ...this.state, spendingBudget });
          this.props.navigation.navigate("EditCategories", {
            title: "EditCategories"
          });
        },
        placeholder: "exp. 1000"
      }
    ];

    const questionFx = question => (
      <View style={{position: 'absolute', top: 50}}>
        <Text style={styles.budgetSetupText}>{question.question}</Text>
        <View style={styles.budgetContainer}>
          <TextInput
            style={styles.budgetInput}
            placeholderTextColor={colorTheme.white.snow}
            onChangeText={question.textInput}
            placeholder={question.placeholder}
          />

          <Button
            raised
            buttonStyle={styles.bugetSetupButton}
            textStyle={{ textAlign: "center" }}
            title={`→`}
            onPress={question.button}
          />
        </View>
      </View>
    );

    let question;

    if (this.state.question === 1) {
      question = questionFx(questions[0]);
    } else if (this.state.question === 2) {
      question = questionFx(questions[1]);
    } else {
      question = questionFx(questions[2]);
    }

    return (
      <View style={styles.container} behavior="padding">
        <View style={{position: "relative", top: -150}}>
          <Image
            source={require("../../../public/img/speech.png")}
            style={{ width: deviceWidth}}
          />
          {question}
        </View>
        <Image
          source={require("../../../public/img/logo2.png")}
          style={{ position: "absolute", bottom: 20, left: -300, height: 450 }}
        />
        <View style={{ position: "absolute", bottom: 100, right: 20 }}>
          <Text style={[styles.h1, { textAlign: "right" }]}>
            Talk to me{"\n"}about your{"\n"}finances
          </Text>
        </View>
      </View>
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
