import React from 'react';
import { View, Text } from 'react-native';
import { StackedBarChart } from 'react-native-svg-charts';

const StackedBar = props => {
  console.log('props *********', props);

  const data = [
    { category: ,
      currentCost: 3840,
      allowedCost: 1920
    },
    { currentCost: 3840, allowedCost: 1920 },
    { currentCost: 3840, allowedCost: 1920 },
    { currentCost: 3840, allowedCost: 1920 }
  ];

  const colors = ['#7b4173', '#de9ed6'];
  const categories = [
    'community',
    'foodAndDrink',
    'recreation',
    'service',
    'shops',
    'travel',
    'healthcare'
  ];

  return (
    <View>
      <Text>Hello!</Text>
      <StackedBarChart
        style={{ height: 200 }}
        keys={categories}
        colors={colors}
        data={data}
        showGrid={false}
        contentInset={{ top: 30, bottom: 30 }}
      />
    </View>
  );
};

export default StackedBar;
