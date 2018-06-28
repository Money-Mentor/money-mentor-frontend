import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Pie from './Pie';
import { pieColor, colorTheme } from '../../common/styles';
import StackedBar from './StackedBar';
// import { StackedBarChart } from 'react-native-svg-charts';

type State = {
  activeIndex: number,
  spendingsPerYear: any
};

class CategoryPie extends Component {
  state: State;

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

  spendingByCategory() {
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
          .filter(item => item.category1 === categories[i])
          .reduce((acc, num) => acc + num.amount, 0);
      total += totalByCategory;
      totalByCategory &&
        categoryTotals.push({ number: totalByCategory, name: categories[i] });
    }

    return [categoryTotals, total];
  }

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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.chart_title}>Spending By Category</Text>
          {/* Pie Chart */}
          <Pie
            pieWidth={225}
            pieHeight={225}
            onItemSelected={this._onPieItemSelected}
            colors={pieColor}
            data={this.getData()}
          />
        </View>

        {/* Progress Bars */}
        <View>
          <StackedBar spendingByCategory={this.spendingByCategory()} />
        </View>

        {/* Transaction Details List */}
        <List>
          {categorytrans &&
            categorytrans.map(transaction => (
              <ListItem
                key={transaction.id}
                title={transaction.name}
                subtitle={transaction.categoty1}
                rightTitle={`$ ${transaction.amount}`}
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

const styles = {
  container: {
    backgroundColor: colorTheme.blue.medium,
    justifyContent: 'center'
  },
  chart_title: {
    paddingTop: 50,
    textAlign: 'center',
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: colorTheme.blue.medium,
    color: 'grey',
    fontWeight: 'bold'
  }
};
