import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAcctTransData } from '../store';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../common/styles';

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

    const fotmatMonth = month => {
      month++;
      return month < 10 ? '0' + month : month;
    };
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let startDateString = `${startDate.getFullYear()}-${fotmatMonth(
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
    const { totalBudget } = this.props;
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
      'Dec',
    ];
    const date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()}`;
  }

  dateCircleHeight() {
    const date = new Date();
    return Math.floor((date.getDate() / 30) * 100);
  }

  budgetCircleHeight() {
    const { totalBudget } = this.props;
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
    const { totalBudget } = this.props;
    const date = new Date();
    // location of the date relative to the circle
    const dateHeight = `${date.getDate() + 26}%`;

    return (
      <View style={styles.homePageContainer}>
        <Text style={styles.budgetStatus}>{this.budgetStatus()}</Text>
        <View style={styles.circle}>
          <View
            style={[
              styles.circleLine,
              { height: `${this.dateCircleHeight()}%`, zIndex: 1 },
            ]}
          />
          <View
            style={[
              styles.circleFill,
              { top: `${this.budgetCircleHeight()}%`, zIndex: 0 },
            ]}
          />
        </View>
        <Text style={styles.cirleBigText}>
          {this.remainingbudget() >= 0
            ? `$${this.remainingbudget()}`
            : `-$${Math.abs(this.remainingbudget())}`}
        </Text>
        <Text style={styles.cirleSmallText}>Remaining Spendable</Text>
        <Text
          style={[
            styles.dateText,
            {
              top: dateHeight,
              left: '85%',
              zIndex: 2,
            },
          ]}
        >
          {this.getDay()}
        </Text>
        <View style={styles.homePagesmallTextAlign}>
          <View >
            <Text style={styles.homePageSmallText}>${totalBudget}</Text>
            <Text style={styles.homePageSmallestText}>Total</Text>
            <Text style={styles.homePageSmallestText} >Budget</Text>
          </View>
          <View >
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
        <View style={{ padding: 10 }}>
          <Button
            raised
            buttonStyle={styles.button}
            textStyle={{ textAlign: 'center' }}
            title={`Go To Account Overview`}
            onPress={() => {
              this.props.navigation.navigate('AccountsOverview', {
                title: 'AccountsOverview',
              });
            }}
          />

          <Button
            raised
            buttonStyle={styles.button}
            textStyle={{ textAlign: 'center' }}
            title={`Go To CategoryPie`}
            onPress={() => {
              this.props.navigation.navigate('CategoryPie', {
                title: 'CategoryPie',
              });
            }}
          />

        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    account: state.acctTrans.accounts,
    trans: state.acctTrans.trans,
    totalBudget: 4000,
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
