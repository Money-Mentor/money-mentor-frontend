import React from 'react';
import { View, Text } from 'react-native';
import { Button, Divider, FormInput } from 'react-native-elements';

// We may not need this library anymore !!
import RadioGroup from 'react-native-custom-radio-group';

class Retirement extends React.Component {
  constructor() {
    super();
    this.state = {
      currAge: '',
      maritalStatus: '',
      homeOwner: '',
      children: '',
      householdIncome: '',
      yearsContributed: '',
      monthly: 0,
      balance: 0
    };
  }

  render() {
    const ageGroup = [
      {
        label: 'Under 35',
        value: 'Under 35'
      },
      {
        label: '35-44',
        value: '35-44'
      },
      {
        label: '45-54',
        value: '45-54'
      },
      {
        label: '55+',
        value: '55+'
      }
    ];

    const marital = [
      {
        label: 'Single',
        value: 'Single'
      },
      {
        label: 'Married',
        value: 'Married'
      }
    ];

    const home = [
      {
        label: 'Yes',
        value: 'Yes'
      },
      {
        label: 'No',
        value: 'No'
      }
    ];

    const child = [
      {
        label: 'Yes',
        value: 'Yes'
      },
      {
        label: 'No',
        value: 'No'
      }
    ];

    const numYears = [
      {
        label: '0-5',
        value: '0-5'
      },
      {
        label: '6-10',
        value: '6-10'
      },
      {
        label: '11-14',
        value: '11-14'
      },
      {
        label: '15-20',
        value: '15-20'
      },
      {
        label: '21+',
        value: '21+'
      }
    ];

    const household = [
      {
        label: '$0 - $35K',
        value: '$0 - $35K'
      },
      {
        label: '$35 - $50K',
        value: '$35 - $50K'
      },
      {
        label: '$50 - $75K',
        value: '$50 - $75K'
      },
      {
        label: '$75 - $100K',
        value: '$75 - $100K'
      },
      {
        label: '$100 - $150K',
        value: '$100 - $150K'
      },
      {
        label: '$150K+',
        value: '$150K+'
      }
    ];

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

        <Text>Current Age</Text>
        <RadioGroup
          buttonContainerStyle={{ width: 100 }}
          radioGroupList={ageGroup}
          onChange={value => this.setState({ currAge: value })}
        />

        <Text>Marital Status</Text>
        <RadioGroup
          containerStyle={{ width: 150 }}
          buttonContainerStyle={{ width: 100 }}
          radioGroupList={marital}
          onChange={value =>
            this.setState({
              maritalStatus: value
            })
          }
        />

        <Text>Home Owner</Text>
        <RadioGroup
          containerStyle={{ width: 150 }}
          buttonContainerStyle={{ width: 100 }}
          radioGroupList={home}
          onChange={value =>
            this.setState({
              homeOwner: value
            })
          }
        />

        <Text>Children</Text>
        <RadioGroup
          containerStyle={{ width: 150 }}
          buttonContainerStyle={{ width: 100 }}
          radioGroupList={child}
          onChange={value =>
            this.setState({
              children: value
            })
          }
        />

        <Text>Household Annual Income</Text>
        <RadioGroup
          buttonContainerStyle={{ width: 75 }}
          radioGroupList={household}
          onChange={value =>
            this.setState({
              householdIncome: value
            })
          }
        />

        <Text>Number of Years Contributing to Retirement</Text>
        <RadioGroup
          buttonContainerStyle={{ width: 75 }}
          radioGroupList={numYears}
          onChange={value => this.setState({ yearsContributed: value })}
        />

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
