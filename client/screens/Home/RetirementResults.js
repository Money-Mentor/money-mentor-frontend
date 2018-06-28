import React from 'react';
import { View, Text } from 'react-native';

class RetirementResults extends React.Component {
  render() {
    const results = this.props.navigation.getParam('results');
    // const { results } = props;
    console.log('....RESULTS!!!!! ', results);
    return (
      <View>
        <Text>Retirement Results</Text>
        <Text>{results.householdIncome}</Text>
        <Text>{results.monthly}</Text>
        <Text>{results.balance}</Text>
      </View>
    );
  }
}

export default RetirementResults;
