import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAcctTransData } from '../../store';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../common/styles';
import { createStackNavigator } from 'react-navigation';
import CategoryPie from './CategoryPie';

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

  totalSpent() {
    const date = new Date();
    const { trans } = this.props;

    const formatMonth = month => {
      month++;
      return month < 10 ? '0' + month : month;
    };
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let startDateString = `${startDate.getFullYear()}-${formatMonth(
      startDate.getMonth()
    )}-01`;

    const spent =
      trans &&
      trans
        .filter(item => item.amount > 0 && item.date > startDateString)
        .reduce((acc, num) => acc + num.amount, 0);
    return spent;
  }

  remainingbudget() {
    const { budget } = this.props;
    const totalBudget = budget && budget.spendingBudget;
    return totalBudget - this.totalSpent();
  }

  getDay() {
    const month = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    const date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()}`;
  }

  dateCircleHeight() {
    const date = new Date();
    return Math.floor((date.getDate() / 30) * 100);
  }

  budgetCircleHeight() {
    const { budget } = this.props;
    const totalBudget = budget && budget.spendingBudget;
    return Math.floor((this.totalSpent() / totalBudget) * 100);
  }

  budgetStatus() {
    if (this.dateCircleHeight() > this.budgetCircleHeight()) {
      return 'Nice! Looks like you are right on track';
    } else if (this.remainingbudget() < 0) {
      return 'Oops! You spent your budget already';
    } else {
      return 'Oh no! Your spendable is more than you daily budget';
    }
  }

  render() {
    console.log('These are my Props', this.props);
    const { budget } = this.props;
    const totalBudget = budget && budget.spendingBudget;
    const date = new Date();
    // location of the date relative to the circle
    // `${date.getDate() + 25}%`
    const dateHeight = `${date.getDate() * 1.13 + 27}%`;

    return (
      <View style={styles.homePageContainer}>
        <Text style={styles.budgetStatus}>{this.budgetStatus()}</Text>

        {/*---------------- Home Budget Circle starts ------------*/}
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('CategoryPie', {
              title: 'CategoryPie',
              budget: budget
            });
          }}
        >
          <View style={styles.circle}>
            <View
              style={[
                styles.circleLine,
                { height: `${this.dateCircleHeight()}%`, zIndex: 1 }
              ]}
            />
            <View
              style={[
                styles.circleFill,
                { top: `${this.budgetCircleHeight()}%`, zIndex: 0 }
              ]}
            />
          </View>
        </TouchableOpacity>

        {/*---------------- Home Budget Circle Text ------------*/}
        <Text style={styles.cirleBigText}>
          {this.remainingbudget() >= 0
            ? `$${this.remainingbudget()}`
            : `-$${Math.abs(this.remainingbudget())}`}
        </Text>
        <Text style={styles.cirleSmallText}>Remaining Spendable</Text>

        {/*---------------- Home Budget Date Position ------------*/}
        <Text style={[styles.dateText, { top: dateHeight }]}>
          {this.getDay()}
        </Text>

        {/*---------------- Total Budget & Daily Spendable ------------*/}
        <View style={styles.homePagesmallTextAlign}>
          <View>
            <Text style={styles.homePageSmallText}>${totalBudget}</Text>
            <Text style={styles.homePageSmallestText}>Total</Text>
            <Text style={styles.homePageSmallestText}>Budget</Text>
          </View>
          <View>
            <Text style={styles.homePageSmallText}>
              {this.remainingbudget() >= 0
                ? `$${Math.floor(
                    this.remainingbudget() / this.getMonthDaysLeft()
                  )}`
                : '$0'}
            </Text>
            <Text style={styles.homePageSmallestText}>Daily</Text>
            <Text style={styles.homePageSmallestText}>Spendable</Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    account: state.acctTrans.accounts,
    trans: state.acctTrans.trans,
    budget: state.acctTrans.budget
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAcctTransData: () => dispatch(fetchAcctTransData())
  };
};

const HomeConnect = connect(
  mapState,
  mapDispatch
)(Home);

export default HomeConnect;

export const HomeStack = createStackNavigator({
  Home: { screen: HomeConnect },
  CategoryPie: { screen: CategoryPie }
});
