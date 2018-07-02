import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart, XAxis } from 'react-native-svg-charts';
import { styles, colorTheme } from '../../common/styles';
import * as scale from 'd3-scale';

class StackedBar extends React.Component {
  constructor(props) {
    super(props);
    this.buildCategoryObj = this.buildCategoryObj.bind(this);
    this.getValueFromCategory = this.getValueFromCategory.bind(this);
    this.getRemainingAllowed = this.getRemainingAllowed.bind(this);
    this.getDay = this.getDay.bind(this);
  }

  buildCategoryObj(str) {
    return {
      category: str,
      spent: this.getValueFromCategory(str),
      getRemainingAllowed: this.getRemainingAllowed(str)
    };
  }

  getValueFromCategory(str) {
    const categories = this.props.getData;
    const currCategory =
      categories && categories.filter(elem => elem.name === str)[0];
    return !currCategory ? 0 : currCategory.number;
  }

  getRemainingAllowed(str) {
    return 100 - this.getValueFromCategory(str);
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
      'Dec'
    ];
    const date = new Date();
    return `${month[date.getMonth()]} ${date.getDate()}`;
  }

  render() {
    const date = new Date();
    const dateHeight = `${75 - date.getDate() * 2.2}%`;

    const data = [
      'Food and Drink',
      'Community',
      'Healthcare',
      'Recreation',
      'Service',
      'Shops',
      'Travel'
    ]
      .map(elem => this.buildCategoryObj(elem))
      .filter(elem => elem.spent !== 0);

    const width = 1000 / data.length;

    const colors = ['#7b4173', '#a55194', '#de9ed6'];
    const keys = ['category', 'spent', 'getRemainingAllowed'];

    return (
      <View style={styles.container}>
        <View style={styles.stackedBar}>
          <Text style={[styles.barText, { color: '#7b4173' }]}>Spent</Text>
          <Text style={[styles.barText, { color: '#de9ed6' }]}>Remaining</Text>
        </View>
        <View>
          <StackedBarChart
            keys={keys}
            colors={colors}
            data={data}
            style={
              { height: 180, width: width } // xScale={scale.scaleBand}
            }
            contentInset={{ top: 30, bottom: 30 }}
            xAccessor
          />

          <View
            style={[
              styles.dateLineCategory,
              { top: `${83 - date.getDate() * 2.2}%` }
            ]}
          />
          <Text style={[styles.dateTextCategory, { top: dateHeight }]}>
            {this.getDay()}
          </Text>

          {/* <XAxis
            data={data.map(elem => elem.category)}
            // xAccessor={elem => elem.category}
            contentInset={{ top: 30, bottom: 30 }}
          /> */}

          {/* <XAxis
            scale={scale.scaleBand}
            data={data.map(elem => elem.category)}
            formatLabel={data => data.category}
            // xAccessor={({ item }) => item}
            // labelStyle={
            //   { color: 'black', fontSize: 18 } // getting x value from data point
            // }
            // contentInset={{ left: 10, right: 10 }}
            // svg={{ fontSize: 10, fill: 'black' }}
          /> */}
        </View>
      </View>
    );
  }
}

export default StackedBar;
