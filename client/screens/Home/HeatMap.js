import CalendarHeatmap from './CalendarHeatMap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles, colorTheme } from '../../common/styles';

class HeatMap extends Component {
  constructor() {
    super();
    this.streakDates = this.streakDates.bind(this);
  }

  streakDates() {
    const { transactions, user } = this.props;
    const dateObj = {};
    let count = 1;
    const values = [];
    if (user.streakType === 'login') {
      //grab login data for the user to make the dates
    } else {
      transactions &&
        transactions.forEach(transaction => {
          if (transaction.category2 === user.streakType) {
            if (!dateObj[transaction.date]) {
              dateObj[transaction.date] = count;
            } else {
              dateObj[transaction.date] = count++;
            }
          }
        });
    }
    for (let key in dateObj) {
      values.push({ date: key, count: dateObj[key] });
    }
    console.log('VALUES', values);
    return values;
  }

  render() {
    const today = new Date();

    return (
      <View style={styles.container}>
        <CalendarHeatmap
          endDate={today}
          numDays={60}
          values={this.streakDates()}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    transactions: state.acctTrans.trans,
  };
};

export default connect(mapState)(HeatMap);
