import React from 'react';
import { View, Text } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import axios from 'axios';
// import { connect } from 'react-redux';

class BudgetSetup extends React.Component {
  constructor() {
    super();
    this.state = {
      income: 0,
      static: 0
    };
  }

  // async componentDidMount() {
  //   await axios.put(`http://localhost:8080/api/budget/${userId}`, {
  //     budget
  //   })
  // }

  render() {
    return (
      <View>
        <Text>Tell us a little about your finances.</Text>
        <Text>What is your income?</Text>
        <FormInput
          containerStyle={{ width: '80%' }}
          onChangeText={amount => this.setState({ income: amount })}
          value={this.state.income}
          placeholder="Income"
        />
        <Text>
          What are your static costs? (i.e. rent, utilities, insurance, etc.)
        </Text>
        <FormInput
          containerStyle={{ width: '80%' }}
          onChangeText={amount => this.setState({ static: amount })}
          value={this.state.static}
          placeholder="Static Costs"
        />
        <View>
          <Button
            raised
            buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
            textStyle={{ textAlign: 'center' }}
            title={`Submit`}
            onPress={() => {
              // this.props.handleSubmit(this.state.income, this.state.static);
              this.props.navigation.navigate('Home', { title: 'Home' });
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    );
  }
}

export default BudgetSetup;
