import React from 'react';
import { View, Text, Image } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setBudget } from '../store';
import { styles } from '../common/styles';

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

  render() {
    return (
      <View style={styles.container}>
         <Text style={styles.initialScreenText}>
            Tell us a little about your finances.
          </Text>
        <Text style={styles.budgetSetupText}>What is your income?</Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 2 }}
          inputStyle={styles.formInput}
          onChangeText={income => this.setState({ income: +income })}
          value={this.state.income}
          placeholder="Income"
        />
        <Text style={styles.budgetSetupText}>
          What are your static costs? (i.e. rent, utilities, insurance, etc.)
        </Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 2 }}
          inputStyle={styles.formInput}
          onChangeText={staticCosts =>
            this.setState({ staticCosts: +staticCosts })
          }
          value={this.state.staticCosts}
          placeholder="Static Costs"
        />
        <Text style={styles.budgetSetupText}>How much would you like to save?</Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop:2 }}
          inputStyle={styles.formInput}
          onChangeText={savings => this.setState({ savings: +savings })}
          value={this.state.savings}
          placeholder="Savings"
        />
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.button}
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
          >
            Submit
          </Button>
        </View>
        </View>
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
