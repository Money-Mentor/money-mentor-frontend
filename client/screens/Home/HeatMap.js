import CalendarHeatmap from './CalendarHeatMap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles, colorTheme } from '../../common/styles';
import { formatDate } from '../../common';

class HeatMap extends Component {
  constructor() {
    super();
    this.streakDates = this.streakDates.bind(this);
    this.userColor = this.userColor.bind(this);
  }

  streakDates() {
    const { transactions, user, userLogins } = this.props;
    const dateObj = {};
    let count = 1;
    const values = [];
    if (user.streakType === 'login') {
      userLogins &&
        userLogins.forEach(login => {
          if (!dateObj[formatDate(login.lastLogin)]) {
            dateObj[formatDate(login.lastLogin)] = count;
          } else {
            dateObj[formatDate(login.lastLogin)] = count++;
          }
        });
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
    return values;
  }

  userColor() {
    const { user } = this.props;
    let color = [];
    if (user.streakType === 'login') {
      color = ['#eeeeee', '#d6e685', '#8cc665', '#44a340', '#1e6823'];
    } else {
      color = [
        '#eeeeee',
        colorTheme.orange.light,
        colorTheme.orange.medium,
        colorTheme.orange.dark,
        colorTheme.orange.superDark,
      ];
    }
    return color;
  }

  render() {
    const today = new Date();

    return (
      <View style={styles.container}>
        <CalendarHeatmap
          endDate={today}
          numDays={60}
          values={this.streakDates()}
          color={this.userColor()}
        />
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    transactions: state.acctTrans.trans,
    userLogins: state.acctTrans.loginStreak,
  };
};

export default connect(mapState)(HeatMap);
