import React from 'react';
import { View, Text } from 'react-native';
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
      spendingBudget: 0
    };
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium }
  };

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
          placeholder="Static Costs"
        />
        <Text style={styles.budgetSetupText}>
          How much would you like to save?
        </Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 2 }}
          inputStyle={styles.formInput}
          onChangeText={savings => this.setState({ savings: +savings })}
          placeholder="Savings"
        />
        <Text style={styles.budgetSetupText}>
          How much is currently in your retirement savings?
        </Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 2 }}
          inputStyle={styles.formInput}
          onChangeText={retirement =>
            this.setState({ retirement: +retirement })
          }
          placeholder="Retirement"
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
                title: 'EditCategories'
              });
            }}
          />
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
