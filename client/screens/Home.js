import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAcctTransData } from '../store';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchAcctTransData();
    this.getMonthDaysLeft = this.getMonthDaysLeft.bind(this);
  }

  getMonthDaysLeft() {
    let date = new Date();
    return (
      new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() -
      date.getDate()
    );
  }

  render() {
    const { account, trans } = this.props;
    const today = new Date().getDate();
    const datePercentage = `${Math.floor((today / 30) * 100)}%`;
    const totalBudget = 1500; //get value based on user
    const spent = 500; //get value based on transactions
    const remainingbudget = totalBudget - spent;
    const budgetPercentage = `${Math.floor(
      (remainingbudget / totalBudget) * 100
    )}%`;
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <View
            style={[styles.circleLine, { height: datePercentage, zIndex: 1 }]}
          />
          <View
            style={[styles.circleFill, { top: budgetPercentage, zIndex: 0 }]}
          />
        </View>
        <Text
          style={[
            styles.text,
            {
              zIndex: 2,
              fontSize: 36,
              top: '40%',
              left: '35%',
            },
          ]}
        >
          ${remainingbudget}
        </Text>
        <Text
          style={[
            styles.text,
            {
              zIndex: 2,
              fontSize: 12,
              top: '45%',
              left: '33%',
            },
          ]}
        >
          Remaining Spendable
        </Text>
        <Text style={[styles.smallerText, { fontSize: 24 }]}>
          ${Math.floor(remainingbudget / this.getMonthDaysLeft())}
        </Text>
        <Text style={[styles.smallerText, { fontSize: 12 }]}>
          Daily Spendable
        </Text>
        <Button
          raised
          buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
          textStyle={{ textAlign: 'center' }}
          title={`Go To Account Overview`}
          onPress={() => {
            this.props.navigation.navigate('AccountsOverview', {
              title: 'AccountsOverview',
            });
          }}
        />
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

const mapDispatch = dispatch => {
  return {
    fetchAcctTransData: () => dispatch(fetchAcctTransData()),
  };
};

export default connect(
  mapState,
  mapDispatch
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C2D3DA',
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 8,
    borderColor: '#F1F3F2',
    overflow: 'hidden',
    backgroundColor: '#c4805a',
  },
  circleLine: {
    borderBottomColor: '#C2D3DA',
    borderBottomWidth: 2,
  },
  circleFill: {
    backgroundColor: '#f19a6a',
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  text: {
    alignSelf: 'center',
    color: '#F1F3F2',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'absolute',
  },
  smallerText: {
    alignSelf: 'center',
    color: '#585A56',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});
