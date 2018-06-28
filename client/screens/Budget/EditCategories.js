import React from 'react';
import { View, Text } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setBudget } from '../../store';

export default class EditCategories extends React.Component {
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
        <Text>Edit Budget Categories</Text>
        {/* <Text>What is your income?</Text>
        <FormInput
          containerStyle={{ width: '80%' }}
          onChangeText={income =>
            this.setState({income: +income})
          }
          value={this.state.income}
          placeholder="Income"
        />
        <Text>
          What are your static costs? (i.e. rent, utilities, insurance, etc.)
        </Text>
        <FormInput
          containerStyle={{ width: '80%' }}
          onChangeText={staticCosts =>
            this.setState({staticCosts: +staticCosts})
          }
          value={this.state.staticCosts}
          placeholder="Static Costs"
          />
        <Text>How much would you like to save?</Text>
        <FormInput
          containerStyle={{ width: '80%' }}
          onChangeText={savings =>
            this.setState({savings: +savings})
          }
          value={this.state.savings}
          placeholder="Savings"
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
              this.props.navigation.navigate('Home', { title: 'Home' });
            }}
          >
            Submit
          </Button>
        </View> */}
      </View>
    );
  }
}

// const mapState = state => {
//   return {
//     budget: state.budget
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     setBudget: budget => dispatch(setBudget(budget)),
//   };
// };

// export default connect(mapState, mapDispatch)(EditCategories);
