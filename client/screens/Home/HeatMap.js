import CalendarHeatmap from './CalendarHeatMap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text, View, ScrollView, Picker } from 'react-native';
import { styles, colorTheme } from '../../common/styles';
import { formatDate } from '../../common';
import StreakCard from './StreakCard';
import { updateUserInterval } from '../../store/user';

const streakCategories = [
  'Login',
  'Restaurants',
  'Bar',
  'Coffee Shop',
  'Clothing',
  'Entertainment',
  'Department Stores',
  'Car Service',
];
class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streakType: this.props.user.streakType,
      dateArr: this.props.navigation.getParam('dateArr'),
    };
    this.streakDates = this.streakDates.bind(this);
    this.userColor = this.userColor.bind(this);
  }

  static navigationOptions = {
    headerStyle: styles.headerStyle,
  };

  streakDates() {
    const { transactions, user, userLogins } = this.props;
    const dateObj = {};
    let count = 1;
    const values = [];
    if (user.streakType === 'Login') {
      userLogins &&
        userLogins.forEach(login => {
          if (!dateObj[formatDate(login.lastLogin)]) {
            dateObj[formatDate(login.lastLogin)] = count;
          } else {
            dateObj[formatDate(login.lastLogin)] = count <= 4 ? count++ : count;
          }
        });
    } else {
      transactions &&
        transactions.forEach(transaction => {
          if (transaction.category2 === user.streakType) {
            if (!dateObj[transaction.date]) {
              dateObj[transaction.date] = count;
            } else {
              dateObj[transaction.date] = count <= 4 ? count++ : count;
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
    if (user.streakType === 'Login') {
      color = [
        colorTheme.white.light,
        colorTheme.green.light,
        colorTheme.green.medium,
        colorTheme.green.dark,
        colorTheme.green.superDark,
        colorTheme.green.almostBlack,
      ];
    } else {
      color = [
        colorTheme.white.light,
        colorTheme.orange.light,
        colorTheme.orange.medium,
        colorTheme.orange.dark,
        colorTheme.orange.superDark,
        colorTheme.orange.almostBlack,
      ];
    }
    return color;
  }

  render() {
    const today = new Date();
    const { user } = this.props;
    const getDateArrForStreak = this.props.navigation.getParam(
      'getDateArrForStreak'
    );
    return (
      <View style={styles.container}>
        <Text style={styles.homePageSmallText}>{user.streakType}</Text>
        <StreakCard dateArr={getDateArrForStreak()} />
        <View style={{ padding: 5 }} />
        <CalendarHeatmap
          endDate={today}
          startDate={'2018-05-01'}
          values={this.streakDates()}
          color={this.userColor()}
        />
        <View style={{ padding: 5 }} />
        <Text style={styles.homePageSmallText}>See Your Streak</Text>
        <Picker
          style={styles.streakPicker}
          selectedValue={this.state.streakType}
          onValueChange={streakType => {
            user.streakType = streakType;
            this.setState({ streakType });
            this.props.updateUserInterval(user);
          }}
        >
          {streakCategories.map(category => {
            return (
              <Picker.Item
                key={category}
                color="white"
                label={category}
                value={category}
              />
            );
          })}
        </Picker>
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

const mapDispatch = dispatch => {
  return {
    updateUserInterval: user => {
      dispatch(updateUserInterval(user));
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(HeatMap);
