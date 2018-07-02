import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { startDateString, getMonthDaysLeft, getDay } from '../../common/index';
import { styles, colorTheme } from '../../common/styles';
import { connect } from 'react-redux';




const BudgetCircle = props => {
  const { budget } = props;
  const date = new Date();
  const dateHeight = `${date.getDate() * 3.0 - 3}%`;
  return (
    /*---------------- Home Budget Circle starts ------------*/
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
              { height: `${this.dateCircleHeight()}%` },
            ]}
          />
          <View
            style={[
              styles.circleFill,
              { top: `${this.budgetCircleHeight()}%` },
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
            top: `${date.getDate() * 2.9 + 2.7}%`,
          },
        ]}
      />
      <Text style={[styles.dateText, { top: dateHeight }]}>{getDay()}</Text>
    </View>
  );
};


const mapState = state => {
  return {
    user: state.user,
    account: state.acctTrans.accounts,
    trans: state.acctTrans.trans,
    budget: state.acctTrans.budget,
  };
};

export default connect(mapState)(BudgetCircle);
