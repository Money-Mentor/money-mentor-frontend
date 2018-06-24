import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { fetchAcctTransData } from '../store';

class AccountsOverview extends React.Component {
  render() {
    const { account, trans } = this.props;

    return (
      <View style={styles.container}>
        <List>
          {/* <Text>Account Overview</Text> */}
          {account &&
            account.map(account => (
              <ListItem
                key={account.id}
                title={account.name}
                rightTitle={`$ ${account.current_balance}`}
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
    trans: state.acctTrans.trans,
  };
};

export default connect(mapState)(AccountsOverview);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#C2D3DA',
  },
});
