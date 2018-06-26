import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from '../common/styles';

class IndividualAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { transactions } = this.props;
    const accountId = this.props.navigation.getParam('accountId');
    return (
      <View style={styles.accountOverviewContainer}>
        <List>
          {transactions &&
            transactions
              .filter(transaction => transaction.accountId === accountId)
              .map(transaction => (
                <ListItem
                  key={transaction.id}
                  title={transaction.name}
                  subtitle={transaction.categoty1}
                  rightTitle={`$ ${transaction.amount}`}
                  // onPress={() =>
                  //   this.props.navigation.navigate('IndividualAccount', {
                  //     title: 'IndividualAccount',
                  //   })
                  // }
                />
              ))}
        </List>
      </View>
    );
  }
}

const mapState = state => {
  return {
    transactions: state.acctTrans.trans,
  };
};

export default connect(mapState)(IndividualAccount);
