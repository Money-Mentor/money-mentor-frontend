import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts';
import { styles, colorTheme } from '../../common/styles';
import { getDay } from '../../common/index';

class StackedBar extends React.Component {
  constructor(props) {
    super(props);
    this.buildCategoryObj = this.buildCategoryObj.bind(this);
    this.getValueFromCategory = this.getValueFromCategory.bind(this);
  }

  buildCategoryObj(str) {
    return {
      category: str,
      spent: this.getValueFromCategory(str),
      getRemainingAllowed: this.getRemainingAllowed(str),
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
      'Travel',
    ]
      .map(elem => this.buildCategoryObj(elem))
      .filter(elem => elem.spent !== 0);

    const width = 700 / data.length;

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
            style={{ height: 180, width: width }}
            showGrid={false}
            contentInset={{ top: 30, bottom: 30 }}
          />

          <View
            style={[
              styles.dateLineCategory,
              {
                top: `${83 - date.getDate() * 2.2}%`,
              },
            ]}
          />
          <Text style={[styles.dateTextCategory, { top: dateHeight }]}>
            {getDay()}
          </Text>
        </View>
      </View>
    );
  }
}

export default StackedBar;
