import React, { Component } from 'react';
import { Text, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Pie from './Pie';
import { pieColor, colorTheme } from '../../common/styles';

type State = {
  activeIndex: number,
  spendingsPerYear: any,
};

class CategoryPie extends Component {
  state: State;

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

  getData() {
    const { budget } = this.props;
    const pieData = budget && [
      { number: budget.community, name: 'Community' },
      { number: budget.foodAndDrink, name: 'Food & Drink' },
      { number: budget.healthcare, name: 'Healthcare' },
      { number: budget.recreation, name: 'Recreation' },
      { number: budget.service, name: 'Service' },
      { number: budget.shops, name: 'Shops' },
      { number: budget.travel, name: 'Travel' },
    ];
    return pieData;
  }

  render() {
    const height = 800;
    const width = 500;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.chart_title}>Spending By Category</Text>
          <Pie
            pieWidth={225}
            pieHeight={225}
            onItemSelected={this._onPieItemSelected}
            colors={pieColor}
            width={width}
            height={height}
            data={this.getData()}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    budget: state.acctTrans.budget,
  };
};

export default connect(mapState)(CategoryPie);

const styles = {
  container: {
    backgroundColor: colorTheme.blue.medium,
    flexgrow: 1,
    justifyContent: 'center',
  },
  chart_title: {
    paddingTop: 50,
    textAlign: 'center',
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor: colorTheme.blue.medium,
    color: 'grey',
    fontWeight: 'bold',
  },
};
