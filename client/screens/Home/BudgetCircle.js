import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getDay } from '../../common/index';
import { styles } from '../../common/styles';
import { connect } from 'react-redux';

const BudgetCircle = props => {
  const {
    budget,
    dateCircleHeight,
    budgetCircleHeight,
    remainingbudget,
  } = props;
  console.log('props in budget circle', props);
  const date = new Date();
  const dateHeight = `${date.getDate() * 3.0 - 3}%`;
  return (
    budget && (
      <View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('CategoryPie', {
              title: 'CategoryPie',
              budget: budget,
            });
          }}
        >
          <View style={[styles.circle, { zIndex: 1 }]}>
            <View
              style={[styles.circleLine, { height: `${dateCircleHeight()}%` }]}
            />
            <View
              style={[styles.circleFill, { top: `${budgetCircleHeight()}%` }]}
            />
          </View>
        </TouchableOpacity>

        {/*---------------- Home Budget Circle Text ------------*/}

        <Text style={styles.cirleBigText}>
          {remainingbudget() >= 0
            ? `$${remainingbudget()}`
            : `-$${Math.abs(remainingbudget())}`}
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
    )
  );
};

const mapState = state => {
  return {
    budget: state.acctTrans.budget,
  };
};

export default connect(mapState)(BudgetCircle);
