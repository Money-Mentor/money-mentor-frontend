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
    console.log(
      trans &&
        trans.filter(item => item.amount > 0 && item.date > startDateString)
    );
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
    console.log(
      'date height: ',
      this.dateCircleHeight(),
      'budget height: ',
      this.budgetCircleHeight()
    );
    const { totalBudget } = this.props;
    const date = new Date();
    // location of the date relative to the circle
    const dateHeight = `${date.getDate() + 26}%`;

    return (
      <View style={styles.container}>
        <Text style={[styles.smallerText, { fontSize: 14 }]}>
          {this.budgetStatus()}
        </Text>
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
        <Text
          style={[
            styles.text,
            {
              zIndex: 2,
              fontSize: 36,
              top: '40%',
              left: '35%'
            }
          ]}
        >
          {this.remainingbudget() >= 0
            ? `$${this.remainingbudget()}`
            : `-$${Math.abs(this.remainingbudget())}`}
        </Text>
        <Text
          style={[
            styles.text,
            {
              zIndex: 2,
              fontSize: 12,
              top: '45%',
              left: '33%'
            }
          ]}
        >
          Remaining Spendable
        </Text>
        <Text
          style={[styles.dateText, { top: dateHeight, left: '85%', zIndex: 2 }]}
        >
          {this.getDay()}
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View>
            <Text style={[styles.smallerText, { fontSize: 18 }]}>
              ${totalBudget}
            </Text>
            <Text style={[styles.smallerText, { fontSize: 12 }]}>Total</Text>
            <Text style={[styles.smallerText, { fontSize: 12 }]}>Budget</Text>
          </View>
          <View>
            <Text style={[styles.smallerText, { fontSize: 18 }]}>
              {this.remainingbudget() >= 0
                ? `$${Math.floor(
                    this.remainingbudget() / this.getMonthDaysLeft()
                  )}`
                : '$0'}
            </Text>
            <Text style={[styles.smallerText, { fontSize: 12 }]}>Daily</Text>
            <Text style={[styles.smallerText, { fontSize: 12 }]}>
              Spendable
            </Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
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
    fetchAcctTransData: () => dispatch(fetchAcctTransData())
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
    backgroundColor: '#C2D3DA'
  },
  circle: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    borderWidth: 8,
    borderColor: '#F1F3F2',
    overflow: 'hidden',
    backgroundColor: '#c4805a'
  },
  circleLine: {
    borderBottomColor: '#F1F3F2',
    borderBottomWidth: 2,
  },
  circleFill: {
    backgroundColor: '#f19a6a',
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  text: {
    color: '#F1F3F2',
    fontWeight: 'bold',
    position: 'absolute',
  },
  dateText: {
    color: '#585A56',
    fontWeight: 'bold',
    position: 'absolute'
  },
  smallerText: {
    alignSelf: 'center',
    color: '#585A56',
    fontWeight: 'bold',
  },
});
