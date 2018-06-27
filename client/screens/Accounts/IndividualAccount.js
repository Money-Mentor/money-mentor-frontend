import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../../common/styles';
import Transaction from './Transaction';

class IndividualAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transactions, account } = this.props;
    const accountId = this.props.navigation.getParam('accountId');

    return (
      <View style={styles.accountOverviewContainer}>
        <List>
          {transactions &&
            transactions
              .filter(transaction => transaction.accountId === accountId)
              .map((transaction, key) => <Transaction key={key} transaction={transaction} />)})}
        </List>
      </View>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    transactions: state.acctTrans.trans,
  };
};

export default connect(mapState)(IndividualAccount);
