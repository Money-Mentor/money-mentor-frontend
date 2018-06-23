import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { fetchAcctTransData } from '../store'

class AccountsOverview extends React.Component {

  render() {
    const {account, trans} = this.props;
    console.log('account from accountsOverview', account)

    return (
      <View style={styles.container}>
        <Text>Account Overview</Text>
        {
          account && account.map(account => {
            return (
              <Text key={account.id}>{account.id}</Text>
            )
          })
        }
      </View>
    );
  }
}


const mapState = state => {
  return {
   account: state.acctTrans.accounts,
   trans: state.acctTrans.trans,
  }
}

export default connect(mapState)(AccountsOverview);


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
