import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setBudget } from '../../store';
import { styles, colorTheme } from '../../common/styles';

class BudgetSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      income: 0,
      staticCosts: 0,
      savings: 0,
      spendingBudget: 0,
    };
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium },
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <Text style={[styles.h1, { top: -10, paddingBottom: 10 }]}>
          Tell us a little about your finances.
        </Text>
        <Text style={styles.budgetSetupText}>What is your income?</Text>
        <TextInput
          style={styles.budgetContainer}
          placeholderTextColor={colorTheme.white.snow}
          onChangeText={income => this.setState({ income: +income })}
          placeholder="Income"
        />
        <Text style={styles.budgetSetupText}>
          What are your static costs? (i.e. rent, utilities, insurance, etc.)
        </Text>
        <TextInput
          style={styles.budgetContainer}
          placeholderTextColor={colorTheme.white.snow}
          onChangeText={staticCosts =>
            this.setState({ staticCosts: +staticCosts })
          }
          placeholder="Static Costs"
        />
        <Text style={styles.budgetSetupText}>
          How much would you like to save?
        </Text>
        <TextInput
          style={styles.budgetContainer}
          placeholderTextColor={colorTheme.white.snow}
          onChangeText={savings => this.setState({ savings: +savings })}
          placeholder="Savings"
        />

        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.smallOrangeButton}
            textStyle={{ textAlign: 'center' }}
            title={`Submit`}
            onPress={() => {
              const spendingBudget =
                this.state.income - this.state.staticCosts - this.state.savings;
              this.props.setBudget({ ...this.state, spendingBudget });
              this.props.navigation.navigate('EditCategories', {
                title: 'EditCategories',
              });
            }}
          />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

const mapState = state => {
  return {
    budget: state.budget,
  };
};

const mapDispatch = dispatch => {
  return {
    setBudget: budget => dispatch(setBudget(budget)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(BudgetSetup);
