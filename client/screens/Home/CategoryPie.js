import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Pie from './Pie';
import { pieColor, colorTheme } from '../../common/styles';


const data = {
  spendingsLastMonth: [
  {"number":  4, "name": 'Fun activities'},
  {"number": 7, "name": 'Dog'},
  {"number": 16, "name": 'Food'},
  {"number": 23, "name": 'Car'},
  {"number": 42, "name": 'Rent'},
  {"number":  4, "name": 'Misc'},
  {"number":  4, "name": 'Other'},
  ]
}

type State = {
  activeIndex: number,
  spendingsPerYear: any
}

class CategoryPie extends Component {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }

  _onPieItemSelected(newIndex){
    this.setState({...this.state, activeIndex: newIndex});
  }

  render() {
    const height = 800;
    const width = 500;

    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>Spending By Category</Text>
          <Pie
            pieWidth={225}
            pieHeight={225}
            onItemSelected={this._onPieItemSelected}
            colors={pieColor}
            width={width}
            height={height}
            data={data.spendingsLastMonth} />
        </View>
      </ScrollView>
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

export default connect(mapState)(CategoryPie);





const styles = {
  container: {
    backgroundColor:colorTheme.blue.medium,
    flexgrow: 1,
    justifyContent: 'center',
  },
  chart_title : {
    paddingTop: 50,
    textAlign: 'center',
    // paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:colorTheme.blue.medium,
    color: 'grey',
    fontWeight:'bold',
  }
}




