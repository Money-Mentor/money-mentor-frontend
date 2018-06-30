import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Pie from './Pie';
import { styles, pieColor, colorTheme } from '../../common/styles';
import { transactionIconType, startDateString } from '../../common/index';
import StackedBar from './StackedBar';

type State = {
  activeIndex: number,
  spendingsPerYear: any
};

class CategoryPie extends Component {
  state: State;
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium }
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this.getData = this.getData.bind(this);
  }

  _onPieItemSelected(newIndex) {
    this.setState({ ...this.state, activeIndex: newIndex });
  }

  getTransByCategory() {
    const { transactions } = this.props;
    const dataArray = this.getData();
    const selectedCategory = dataArray[this.state.activeIndex].name;
    const categorytrans =
      transactions &&
      transactions.filter(
        transaction => transaction.category1 === selectedCategory
      );
    return categorytrans;
  }

  //[{number:1600, name: catergory}...],total of all buckets

  spendingByCategory() {
    let startDate = startDateString();
    const { transactions } = this.props;
    let categories = [
      'Community',
      'Food and Drink',
      'Healthcare',
      'Recreation',
      'Service',
      'Shops',
      'Travel'
    ];
    let categoryTotals = [];
    let totalByCategory;
    let total = 0;

    for (let i = 0; i < categories.length; i++) {
      totalByCategory =
        transactions &&
        transactions
          .filter(
            item => item.category1 === categories[i] && item.date > startDate
          )
          .reduce((acc, num) => acc + num.amount, 0);
      total += totalByCategory;
      totalByCategory &&
        categoryTotals.push({ number: totalByCategory, name: categories[i] });
    }

    return [categoryTotals, total];
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
        name: category.name
      });
    });

    return spendingByCategoryPercentArr;
  }

  render() {
    const categorytrans = this.getTransByCategory();
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
            budget={this.props.budget}
            spendingByCategory={this.spendingByCategory()}
          />
        </View>

        {/* Progress Bars */}

          <StackedBar
            budget={this.props.budget}
            spendingByCategory={this.spendingByCategory()}
            getData={this.getData()}
          />
       

        {/* Transaction Details List */}
        <List>
          <Text style={styles.transactionTitle}>Transactions</Text>
          {categorytrans &&
            categorytrans.map(transaction => (
              <ListItem
                key={transaction.id}
                title={transaction.name}
                rightTitle={`$ ${transaction.amount}`}
                leftIcon={{
                  name: transactionIconType[transaction.category2]
                }}
              />
            ))}
        </List>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    budget: state.acctTrans.budget,
    transactions: state.acctTrans.trans
  };
};

export default connect(mapState)(CategoryPie);
