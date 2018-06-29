import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts';

class StackedBar extends React.Component {
  constructor(props) {
    super(props);
    this.getValueFromCategory = this.getValueFromCategory.bind(this);
    this.getTotalAllowed = this.getTotalAllowed.bind(this);
  }

  getValueFromCategory(str) {
    const categories = this.props.spendingByCategory[0];
    const currCategory =
      categories && categories.filter(elem => elem.name === str)[0];
    return !currCategory ? 0 : currCategory.number;
  }

  getTotalAllowed(str) {}

  render() {
    console.log('what is data!!!!!!!', this.props.getData);
    const data = [
      {
        category: 'Food and Drink',
        totalAllowed: 0,
        currSpent: this.getValueFromCategory('Food and Drink'),
        allocatedAmountByDate: 640
      },
      {
        category: 'Community',
        totalAllowed: 3320,
        currSpent: this.getValueFromCategory('Community'),
        allocatedAmountByDate: 640
      },
      {
        category: 'Healthcare',
        totalAllowed: 3320,
        currSpent: this.getValueFromCategory('Healthcare'),
        allocatedAmountByDate: 640
      },
      {
        category: 'Recreation',
        totalAllowed: 3320,
        currSpent: this.getValueFromCategory('Recreation'),
        allocatedAmountByDate: 640
      },
      {
        category: 'Service',
        totalAllowed: 3320,
        currSpent: this.getValueFromCategory('Service'),
        allocatedAmountByDate: 640
      },
      {
        category: 'Shops',
        totalAllowed: 3320,
        currSpent: this.getValueFromCategory('Shops'),
        allocatedAmountByDate: 640
      },
      {
        category: 'Travel',
        totalAllowed: 3320,
        currSpent: this.getValueFromCategory('Travel'),
        allocatedAmountByDate: 640
      }
    ].filter(elem => elem.currSpent !== 0);
    console.log('Category Object for FoodDrink', data[0]);
    console.log('Category Object for Category', data[1]);

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6'];
    const keys = [
      'category',
      'totalAllowed',
      'currSpent',
      'allocatedAmountByDate'
    ];

    return (
      // <View>
      //   <Text>Hello</Text>
      // </View>
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
