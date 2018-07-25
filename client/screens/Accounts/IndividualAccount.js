import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Transaction from './Transaction';
import { styles, colorTheme } from '../../common/styles';
import { startDateString } from '../../common/index';

class IndividualAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'Transactions',
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow },
  };

  render() {
    const { transactions } = this.props;
    let startDate = startDateString();
    const accountId = this.props.navigation.getParam('accountId');
    return (
      <ScrollView style={styles.accountOverviewContainer}>
        {
          <List>
            {transactions &&
              transactions
                .filter(
                  transaction =>
                    transaction.accountId === accountId &&
                    transaction.date >= startDate
                )
                .sort((a, b) => {
                  const sortedByDate = new Date(b.date) - new Date(a.date);

                  if (sortedByDate !== 0) {
                    return sortedByDate;
                  }

                  return b.id - a.id;
                })
                .map((transaction, key) => (
                  <Transaction key={key} transaction={transaction} />
                ))}
          </List>
        }
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    transactions: state.acctTrans.trans,
  };
};

export default connect(mapState)(IndividualAccount);
