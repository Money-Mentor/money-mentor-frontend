import React from 'react';
import { View, Text } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setBudget } from '../store';

class EditCategories extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     income: 0,
  //     staticCosts: 0,
  //     savings: 0,
  //     spendingBudget: 0
  //   };
  // }

  render() {
    
    return (
      <View>
        <Text>Tell us a little about your finances.</Text>
        <Text>What is your income?</Text>
        <FormInput
          containerStyle={{ width: '80%' }}
          onChangeText={income =>
            this.setState({income: +income})
          }
          value={this.state.income}
          placeholder="Income"
        />

        <View>
          <Button
            raised
            buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
            textStyle={{ textAlign: 'center' }}
            title={`Submit`}
            onPress={() => {
              const spendingBudget = this.state.income - this.state.staticCosts - this.state.savings
              this.props.setBudget({...this.state, spendingBudget});
              this.props.navigation.navigate('EditCategories', { title: 'EditCategories' });
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
    budget: state.budget
  };
};

const mapDispatch = dispatch => {
  return {
    setBudget: budget => dispatch(setBudget(budget)),
  };
};

export default connect(mapState, mapDispatch)(EditCategories);
