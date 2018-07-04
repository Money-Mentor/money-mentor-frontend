import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAcctTransData, login } from '../../store';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles, colorTheme } from '../../common/styles';
import { createStackNavigator } from 'react-navigation';
import CategoryPie from './CategoryPie';
import HeatMap from './HeatMap';
import { Button, Card, Icon } from 'react-native-elements';
import Quiz from './Quiz';
import Result from './Result';

import {
  startDateString,
  getMonthDaysLeft,
  bestStreak,
  currentStreak,
  getAllDays,
  formatDate,
} from '../../common/index';
import ArticleCarousel from './ArticleCarousel';
import BudgetCircle from './BudgetCircle';
import ReminderInterval from '../Profile/ReminderInterval';


class Home extends Component {
  constructor() {
    super();
    this.remainingbudget = this.remainingbudget.bind(this);
    this.budgetCircleHeight = this.budgetCircleHeight.bind(this);
    this.onBudgetCirclePress = this.onBudgetCirclePress.bind(this);
    this.getDateArrForStreak = this.getDateArrForStreak.bind(this);
  }
  static navigationOptions = {
    headerStyle: styles.headerStyle,
  };

  componentDidMount() {
    this.props.fetchAcctTransData();
  }

  onBudgetCirclePress() {
    const { budget } = this.props;
    this.props.navigation.navigate('CategoryPie', {
      title: 'CategoryPie',
      budget: budget,
    });
  }

  totalSpent() {
    const { trans } = this.props;
    let startDate = startDateString();
    const spent =
      trans &&
      trans
        .filter(
          item => item.included && item.amount > 0 && item.date >= startDate
        )
        .reduce((acc, num) => acc + num.amount, 0);
    return spent;
  }

  remainingbudget() {
    const { budget } = this.props;
    const totalBudget = budget && budget.spendingBudget;
    return totalBudget - this.totalSpent();
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
      return 'Nice! You are on track';
    } else if (this.remainingbudget() < 0) {
      return 'Oops! You spent your budget already';
    } else {
      return 'Time to lower your spending!';
    }
  }

  getDateArrForStreak() {
    let dateArr = [];
    const { trans, user, userLogins } = this.props;
    if (user.streakType === 'login') {
      const loggedDateArr = [];
      userLogins &&
        userLogins.forEach(login => {
          loggedDateArr.push(login.lastLogin.slice(0, 10));
        });
      loggedDateArr.sort();
      if (loggedDateArr.length) {
        dateArr = getAllDays(loggedDateArr)
          .filter(date => {
            return loggedDateArr.indexOf(date) === -1;
          })
          .map(date => new Date(date));
      }
    } else {
      trans &&
        trans.forEach(transaction => {
          if (transaction.category2 === user.streakType) {
            dateArr.push(new Date(transaction.date));
          }
        });
    }
    return dateArr.sort();
  }

  render() {
    const { budget } = this.props;
    const totalBudget = budget && budget.spendingBudget;
    const dateArr = this.getDateArrForStreak();

    return (
      <ScrollView style={{ backgroundColor: colorTheme.blue.medium }}>
        <View style={styles.homePageContainer}>
          {/*---------------- Quiz and budget setup ------------*/}
          {!this.props.user.personalityType ? (
            <View>
              <Card containerStyle={styles.card}>
                <Text style={styles.homePageQuiz}>
                  MoneyMentor wants to give you personalized recommendations so
                  take the quiz to find out your financial personality type.
                </Text>
                <Button
                  raised
                  buttonStyle={styles.bluebutton}
                  textStyle={{ textAlign: 'center' }}
                  title={`Take the Quiz`}
                  onPress={() => {
                    this.props.navigation.navigate('Quiz', { title: 'Quiz' });
                  }}
                />
              </Card>
            </View>
          ) : (
            <View />
          )}
          {/*---------------- Streak Card ------------*/}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('HeatMap', { title: 'HeatMap' });
            }}
          >
            <Card containerStyle={styles.streakCard}>
              <View style={styles.streakCardTextAlign}>
                <View>
                  <Text style={styles.streakCardsmallerText}>
                    Current Streak
                  </Text>
                  <Text style={styles.streakCardText}>
                    {currentStreak(dateArr)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.streakCardsmallerText}>Best Streak</Text>
                  <Text style={styles.streakCardText}>
                    {bestStreak(dateArr)}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
          {/*---------------- Budget Status ------------*/}
          <Text
            style={[
              styles.homePageSmallText,
              { paddingVertical: 10, width: '80%', textAlign: 'center' },
            ]}
          >
            {this.budgetStatus()}
          </Text>
          {/*---------------- Budget Circle ------------*/}
          {this.props.budget && (
            <BudgetCircle
              onBudgetCirclePress={this.onBudgetCirclePress}
              dateCircleHeight={this.dateCircleHeight}
              budgetCircleHeight={this.budgetCircleHeight}
              remainingbudget={this.remainingbudget}
            />
          )}
          {/*---------------- Total Budget & Daily Spendable ------------*/}
          <View>
            <View style={styles.homePageBudgetTextAlign}>
              <View>
                <Text style={styles.homePageSmallText}>${totalBudget}</Text>
                <Text style={styles.homePageSmallestText}>Total</Text>
                <Text style={styles.homePageSmallestText}>Budget</Text>
              </View>
              <View>
                <Text style={styles.homePageSmallText}>
                  {this.remainingbudget() >= 0
                    ? `$${Math.floor(
                        this.remainingbudget() / getMonthDaysLeft()
                      )}`
                    : '$0'}
                </Text>
                <Text style={styles.homePageSmallestText}>Daily</Text>
                <Text style={styles.homePageSmallestText}>Spendable</Text>
              </View>
            </View>
          </View>
          {/*-------------- Article suggestions------------*/}
          <View style={{ padding: 10 }}>
            <ArticleCarousel />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    account: state.acctTrans.accounts,
    trans: state.acctTrans.trans,
    budget: state.acctTrans.budget,
    userLogins: state.acctTrans.loginStreak,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAcctTransData: () => dispatch(fetchAcctTransData()),
  };
};

const HomeConnect = connect(
  mapState,
  mapDispatch
)(Home);

export default HomeConnect;

export const HomeStack = createStackNavigator({
  Home: { screen: HomeConnect },
  Quiz: { screen: Quiz },
  Result: { screen: Result },
  CategoryPie: { screen: CategoryPie },
  HeatMap: { screen: HeatMap },
  ReminderInterval: { screen: ReminderInterval },
});
