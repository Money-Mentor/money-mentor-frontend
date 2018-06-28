import React from 'react';
import { View, Text } from 'react-native';
import { colorTheme } from '../../common/styles';


class RetirementResults extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium },
  };
  render() {
    const results = this.props.navigation.getParam('results');
    // const { results } = props;
    return (
      <View>
        <Text>Retirement Results</Text>
        {/* <Text>{results.monthly}</Text>
        <Text>{results.balance}</Text> */}
      </View>
    );
  }
}

export default RetirementResults;
