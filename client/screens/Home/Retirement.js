import React from 'react';
import { View, Text } from 'react-native';
import { Button, Divider, FormInput } from 'react-native-elements';

class Retirement extends React.Component {
  constructor() {
    super();
    this.state = {
      currAge: 0,
      maritalStatus: '',
      homeOwner: false,
      children: false,
      householdIncome: 0,
      yearsContributed: 0,
      monthly: 0,
      balance: 0
    };
  }

  render() {
    const age = ['Under 35', '35-44', '45-54', '55+'];
    const marital = ['Single', 'Married'];
    const home = ['Yes', 'No'];
    const child = ['Yes', 'No'];
    const num = ['0-5', '6-10', '11-14', '15-20', '21+'];
    
    return (
      <View>
        <Text>Retirement</Text>
        <Text>
          The Peer Comparison Tool enables you to see how much people like you
          are contributing and saving for retirement, and how your progress
          stacks up against your peers. Comparisons are based on Nationwide®
          457(b) and 401(k) retirement plan data.
        </Text>
        <Divider style={{ backgroundColor: 'blue' }} />

        <Text>Current monthly retirement plan contributions</Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 2 }}
          onChangeText={monthly => this.setState({ monthly })}
          value={this.state.monthly}
        />

        <Text>Current retirement plan balance</Text>
        <FormInput
          containerStyle={{ width: '80%', paddingTop: 2 }}
          onChangeText={balance => this.setState({ balance })}
          value={this.state.balance}
        />

        <Button
          raised
          textStyle={{ textAlign: 'center' }}
          title={`Submit`}
          onPress={() => {
            const results = this.state;
            this.props.navigation.navigate('RetirementResults', {
              title: 'RetirementResults',
              results: results
            });
          }}
        />
      </View>
    );
  }
}

export default Retirement;
