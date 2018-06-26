import React, { Component } from 'react';
import {
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Pie from './Pie';
import { pieColor } from '../../common/styles';


const data = {
  spendingsLastMonth: [
  {"number":  8, "name": 'Fun activities'},
  {"number": 7, "name": 'Dog'},
  {"number": 16, "name": 'Food'},
  {"number": 23, "name": 'Car'},
  {"number": 42, "name": 'Rent'},
  {"number":  4, "name": 'Misc'},
  ]
}

type State = {
  activeIndex: number,
  spendingsPerYear: any
}

export default class CategoryPie extends Component {

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
    const height = 200;
    const width = 500;

    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>Distribution of spending this month</Text>
          <Pie
            pieWidth={150}
            pieHeight={150}
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


const styles = {
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 21,
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:'white',
    color: 'grey',
    fontWeight:'bold',
  }
}




