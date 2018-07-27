import React, { Component } from 'react';
import { SectionList, Text, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Pie from './Pie';
import { styles, pieColor, colorTheme } from '../../common/styles';
import { startDateString, sectionData } from '../../common/index';
import Transaction from '../Accounts/Transaction';
import StackedBar from './StackedBar';

function keyExtractor(item) {
  return item.id;
}

const renderSectionHeader = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
  </View>
);

const renderItem = ({ item }) => <Transaction transaction={item} />;

class CategoryPie extends Component {
  static navigationOptions = {
    headerStyle: styles.headerStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this.getData = this.getData.bind(this);
  }

  _onPieItemSelected(newIndex) {
    this.setState({ ...this.state, activeIndex: newIndex });
  }

  getTransByCategory() {
    const { transactions } = this.props;
    let startDate = startDateString();
    const dataArray = this.getData();
    const selectedCategory = dataArray[this.state.activeIndex].name;
    const categorytrans =
      transactions &&
      transactions.filter(
        transaction =>
          transaction.date >= startDate &&
          transaction.category1 === selectedCategory
      );
    return categorytrans;
  }

  sections() {
    const transactions = this.getTransByCategory();
    return sectionData(transactions);
  }

  //[{number:1600, name: catergory}...],total of all buckets
  spendingByCategory() {
    let startDate = startDateString();
    const { transactions } = this.props;
    let categoriesArr = [
      'Community',
      'Food and Drink',
      'Healthcare',
      'Recreation',
      'Service',
      'Shops',
      'Travel',
    ];

    const categoriesObj = {};
    let total = 0;
    transactions.map(transaction => {
      if (
        categoriesArr.indexOf(transaction.category1) > -1 &&
        transaction.date >= startDate
      ) {
        if (!categoriesObj[transaction.category1]) {
          categoriesObj[transaction.category1] = transaction.amount;
          total += transaction.amount;
        } else {
          categoriesObj[transaction.category1] += transaction.amount;
          total += transaction.amount;
        }
      }
    });

    const categoryTotal = [];
    categoriesArr.forEach(category => {
      if (categoriesObj[category]) {
        categoryTotal.push({ name: category, number: categoriesObj[category] });
      }
    });
    return [categoryTotal, total];
  }

  // Get Total. Division. Get to Percentage by category.
  getData() {
    let [spendingByCategory, total] = this.spendingByCategory();
    let percent;
    let spendingByCategoryPercentArr = [];

    spendingByCategory.map(category => {
      percent = Math.round((category.number / total) * 100);
      spendingByCategoryPercentArr.push({
        number: percent,
        name: category.name,
      });
    });

    return spendingByCategoryPercentArr;
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: colorTheme.blue.medium }}>
        <View style={styles.container}>
          <Text style={[styles.homePageSmallText, { paddingBottom: 10 }]}>
            Spending By Category
          </Text>
          <Pie
            pieWidth={225}
            pieHeight={225}
            onItemSelected={this._onPieItemSelected}
            colors={pieColor}
            data={this.getData()}
          />
        </View>

        {/* Progress Bars */}
        {/* <StackedBar getData={this.getData()} /> */}

        {/* Transaction Details List */}
        <List>
          <View style={styles.transactionTitleContainer}>
            <Text style={styles.transactionTitle}>
              {this.spendingByCategory()[0][this.state.activeIndex].name}
            </Text>
            <Text style={styles.transactionTitle}>
              ${this.spendingByCategory()[0][this.state.activeIndex].number}
            </Text>
          </View>
        </List>
        <View style={styles.accountOverviewContainer}>
        <SectionList
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          sections={this.sections()}
        />
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    budget: state.acctTrans.budget,
    transactions: state.acctTrans.trans,
  };
};

export default connect(mapState)(CategoryPie);
