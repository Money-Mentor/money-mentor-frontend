import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { styles } from '../../common/styles';
import IndividualAccount from './IndividualAccount';


class Accounts extends React.Component {
  render() {
    const { account, trans } = this.props;

    return (
      <View style={styles.accountOverviewContainer}>
        <List>
          {/* <Text>Account Overview</Text> */}
          {account &&
            account.map(account => (

                <ListItem
                  key={account.id}
                  title={account.name}
                  rightTitle={`$ ${account.current_balance}`}
                  onPress={() =>
                    this.props.navigation.navigate('IndividualAccount', {
                      title: 'IndividualAccount',
                      accountId: account.account_id,
                    })
                  }
                />
            ))}
        </List>
      </View>
    );
  }
}

const mapState = state => {
  return {
    account: state.acctTrans.accounts,
    trans: state.acctTrans.trans
  };
};

const AccountsConnect = connect(mapState)(Accounts);
export default AccountsConnect;

export const AccountStack = createStackNavigator({
  Accounts: { screen: AccountsConnect },
  IndividualAccount: { screen: IndividualAccount },
});
