import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAcctTransData } from '../../store';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles, colorTheme } from '../../common/styles';
import { createStackNavigator } from 'react-navigation';
import CategoryPie from './CategoryPie';
import { Button, Card, Icon } from 'react-native-elements';
import Quiz from './Quiz';
import Result from './Result';
import Retirement from './Retirement';
import RetirementResults from './RetirementResults';
import { startDateString } from '../../common/index';
import ArticleCarousel from './ArticleCarousel';

class Home extends React.Component {
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium },
  };

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
    const { trans } = this.props;
    let startDate = startDateString();
    const spent =
      trans &&
      trans
        .filter(item => item.included && item.amount > 0 && item.date >= startDate)
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

  render() {
    const { budget } = this.props;
    const totalBudget = budget && budget.spendingBudget;
    const date = new Date();
    const dateHeight = `${date.getDate() * 3.1 - 3}%`;

    return (
      <ScrollView style={{ backgroundColor: colorTheme.blue.medium }}>
        <View style={styles.homePageContainer}>
          {/*---------------- Quiz and budget setup ------------*/}
          {!this.props.user.personalityType ? (
            <View>
              <Card containerStyle={styles.card}>
                <Text style={styles.homePageQuiz}>
                  Looks like you haven't taken our quiz.{' '}
                </Text>
                <Text style={styles.homePageQuiz}>Take it now!</Text>
                <Button
                  raised
                  buttonStyle={styles.bluebutton}
                  textStyle={{ textAlign: 'center' }}
                  title={`Take the Quiz!`}
                  onPress={() => {
                    this.props.navigation.navigate('Quiz', { title: 'Quiz' });
                  }}
                />
              </Card>
            </View>
          ) : (
            <View />
          )}
          <Text
            style={[
              styles.homePageSmallText,
              { paddingVertical: 10, width: '80%', textAlign: 'center' },
            ]}
          >
            {this.budgetStatus()}
          </Text>

          {/*---------------- Home Budget Circle starts ------------*/}
          <View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CategoryPie', {
                  title: 'CategoryPie',
                  budget: budget,
                });
              }}
            >
              <View style={[styles.circle, { zIndex: 1 }]}>
                <View
                  style={[
                    styles.circleLine,
                    { height: `${this.dateCircleHeight()}%`, zIndex: 2 },
                  ]}
                />
                <View
                  style={[
                    styles.circleFill,
                    { top: `${this.budgetCircleHeight()}%`, zIndex: 1 },
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
            <View
              style={[
                styles.dateLine,
                {
                  position: 'absolute',
                  top: `${date.getDate() * 3.1 + 2.7}%`,
                  left: '30%',
                  width: '50%',
                },
              ]}
            />
            <Text style={[styles.dateText, { top: dateHeight }]}>
              {this.getDay()}
            </Text>
          </View>

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
                        this.remainingbudget() / this.getMonthDaysLeft()
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
  Retirement: { screen: Retirement },
  RetirementResults: { screen: RetirementResults },
});
