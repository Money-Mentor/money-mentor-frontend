import React from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image
} from "react-native";
import { FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import { setBudget } from "../../store";
import { styles, colorTheme, deviceWidth } from "../../common/styles";

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
    const question1 = (
      <View
        style={{
          width: deviceWidth - 40,
          position: "absolute",
          top: 50,
          alignItems: "center"
        }}
      >
        <Text style={styles.budgetSetupText}>What is your monthly income?</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TextInput
            style={styles.budgetContainer}
            placeholderTextColor={colorTheme.white.snow}
            onChangeText={income => this.setState({ income: +income })}
            placeholder="Income"
          />

          <Button
            raised
            buttonStyle={styles.smallOrangeButton}
            textStyle={{ textAlign: 'center' }}
            title={`→`}
            onPress={() => {
              this.setState({question: 2})
            }}
          />
        </View>
      </View>
    );

    const question2 = (
      <View
        style={{
          width: deviceWidth - 40,
          position: "absolute",
          top: 40,
          alignItems: "center"
        }}
      >
        <Text style={styles.budgetSetupText}>What are your monthly static costs?</Text>
        <Text style={{fontSize: 15, textAlign: 'center'}}>(i.e. rent, utilities, insurance, etc.)</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TextInput
            style={styles.budgetContainer}
            placeholderTextColor={colorTheme.white.snow}
            onChangeText={staticCosts =>
              this.setState({ staticCosts: +staticCosts })
            }
            placeholder="Static Costs"
          />

          <Button
            raised
            buttonStyle={styles.smallOrangeButton}
            textStyle={{ textAlign: 'center' }}
            title={`→`}
            onPress={() => {
              this.setState({question: 3})
            }}
          />
        </View>
      </View>
    );

    const question3 = (
      <View
        style={{
          width: deviceWidth - 40,
          position: "absolute",
          top: 50,
          alignItems: "center"
        }}
      >
        <Text style={styles.budgetSetupText}>How much would you like to save this month?</Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TextInput
            style={styles.budgetContainer}
            placeholderTextColor={colorTheme.white.snow}
            onChangeText={savings => this.setState({ savings: +savings })}
          placeholder="Savings"
          />

          <Button
            raised
            buttonStyle={styles.smallOrangeButton}
            textStyle={{ textAlign: "center" }}
            title={`→`}
            onPress={() => {
              const spendingBudget =
                this.state.income - this.state.staticCosts - this.state.savings;
              this.props.setBudget({ ...this.state, spendingBudget });
              this.props.navigation.navigate("EditCategories", {
                title: "EditCategories"
              });
            }}
          />
        </View>
      </View>
    );

    let question;

    if (this.state.question === 1) {
      question = question1
    } else if (this.state.question === 2) {
      question = question2
    } else {
      question = question3
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image
          source={require("../../../public/img/speech.png")}
          style={{ width: deviceWidth - 20, position: "absolute", top: -2 }}
        />
        <Image
          source={require("../../../public/img/logo2.png")}
          style={{ position: "absolute", bottom: -50, left: -200 }}
        />
        <View style={{ position: "absolute", bottom: 20, right: 20 }}>
          <Text style={[styles.h1, { textAlign: "right" }]}>
            Talk to me{"\n"}about your{"\n"}finances
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
