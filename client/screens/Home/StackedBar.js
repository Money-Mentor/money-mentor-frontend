import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts';

class StackedBar extends React.Component {
  constructor(props) {
    super(props);
    this.getValueFromCategory = this.getValueFromCategory.bind(this);
  }

  getValueFromCategory(str) {
    const catValue = this.props.spendingByCategory.map(elem => {
      if (elem.name === str) {
        return elem.value;
      }
    });
    return catValue;
  }

  render() {
    console.log('props *********', this.props.spendingByCategory);
    console.log('GET DATAAAA++++', this.props.getData);

    const data = [
      {
        category: 'Food and Drink',
        totalAllowed: this.getValueFromCategory('Food and Drink'),
        currSpent: 480,
        allocatedAmountByDate: 640
      },
      {
        category: 'Community',
        totalAllowed: 3320,
        currSpent: 480,
        allocatedAmountByDate: 640
      },
      {
        category: 'Healthcare',
        totalAllowed: 3320,
        currSpent: 480,
        allocatedAmountByDate: 640
      },
      {
        category: 'Recreation',
        totalAllowed: 3320,
        currSpent: 480,
        allocatedAmountByDate: 640
      },
      {
        category: 'Service',
        totalAllowed: 3320,
        currSpent: 480,
        allocatedAmountByDate: 640
      },
      {
        category: 'Shops',
        totalAllowed: 3320,
        currSpent: 480,
        allocatedAmountByDate: 640
      },
      {
        category: 'Travel',
        totalAllowed: 3320,
        currSpent: 480,
        allocatedAmountByDate: 640
      }
    ];
    console.log('this should be the number ::::::', data[0]);

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6'];
    const keys = [
      'category',
      'totalAllowed',
      'currSpent',
      'allocatedAmountByDate'
    ];

    return (
      <StackedBarChart
        style={{ height: 200 }}
        keys={keys}
        colors={colors}
        data={data}
        showGrid={false}
        contentInset={{ top: 30, bottom: 30 }}
      />
    );
  }
}

// const data = [
//   {
//     // category: categories[0],
//     currentCost: 3840,
//     allowedCost: 1920
//   },
//   { currentCost: 3840, allowedCost: 1920 },
//   { currentCost: 3840, allowedCost: 1920 },
//   { currentCost: 3840, allowedCost: 1920 }
// ];

// const colors = ['#7b4173', '#de9ed6'];
// const categories = [
//   'community',
//   'foodAndDrink',
//   'recreation',
//   'service',
//   'shops',
//   'travel',
//   'healthcare'
// ];

// return (
//   <View>
//     <Text>Hello!</Text>
//     <StackedBarChart
//       style={{ height: 200 }}
//       keys={categories}
//       colors={colors}
//       data={data}
//       showGrid={false}
//       contentInset={{ top: 30, bottom: 30 }}
//     />
//   </View>
// );

export default StackedBar;
