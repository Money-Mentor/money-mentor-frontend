//   constructor(props) {
//     super(props);
//     this.buildCategoryObj = this.buildCategoryObj.bind(this);
//     this.getValueFromCategory = this.getValueFromCategory.bind(this);
//     this.getRemainingAllowed = this.getRemainingAllowed.bind(this);
//   }

//   buildCategoryObj(str) {
//     return {
//       category: str,
//       spent: this.getValueFromCategory(str),
//       getRemainingAllowed: this.getRemainingAllowed(str)
//     };
//   }

//   getValueFromCategory(str) {
//     const categories = this.props.getData;
//     const currCategory =
//       categories && categories.filter(elem => elem.name === str)[0];
//     return !currCategory ? 0 : currCategory.number;
//   }

//   getRemainingAllowed(str) {
//     return 100 - this.getValueFromCategory(str);
//   }

'use strict';

import React, {
  Component,
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import StackedBarItem from './StackedBarItem';
const barInterval = 2;
const barItemTop = 16;

export default class PlayerTrend extends Component {
  constructor(props) {
    super(props);
    this.unitHeight = 2;
  }

  calculateLog(data, indicator) {
    const count = data.length;
    let high = data[0][indicator];
    let low = data[0][indicator];
    let highDate = data[0]['gameDate'];
    let lowDate = data[0]['gameDate'];
    let sum = 0;

    let value;
    data.forEach((d, index) => {
      value = d[indicator];
      sum += value;
      if (value < low) {
        low = value;
        lowDate = data[index]['gameDate'];
      } else if (value > high) {
        high = value;
        highDate = data[index]['gameDate'];
      }
    });

    return {
      low,
      high,
      count,
      sum,
      avg: sum / count,
      highDate,
      lowDate
    };
  }

  renderBars(data, high, low, color) {
    const { unitHeight } = this;

    return data.map((value, index) => {
      return (
        <StackedBarItem
          key={index}
          value={value}
          high={high}
          low={low}
          color={color}
          unitHeight={unitHeight}
          barItemTop={barItemTop}
          barInterval={barInterval}
        />
      );
    });
  }

  render() {
    const { data } = this.props;

    console.log('*********** data', data);

    // const { unitHeight } = this;
    // const footData = this.calculateLog(data, 'plusMinus');

    // const scrollHeight =
    //   footData.high * unitHeight +
    //   Math.abs(footData.low) * unitHeight +
    //   barItemTop;
    return (
      <View>
        <Text>Hello</Text>
      </View>

      // <View style={styles.container}>
      //   <Text style={styles.title}>+ / -</Text>
      //   <ScrollView
      //     horizontal
      //     showsHorizontalScrollIndicator={false}
      //     showsVerticalScrollIndicator={false}
      //     alwaysBounceVertical={false}
      //     directionalLockEnabled
      //     style={[styles.scrollView, { height: scrollHeight }]}
      //   >
      //     {this.renderBars(
      //       data.map(d => d.plusMinus),
      //       footData.high,
      //       footData.low,
      //       color
      //     )}
      //   </ScrollView>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingBottom: 30
  },
  title: {
    color: '#6B7C96',
    fontSize: 13,
    fontWeight: '600'
  },
  // Bar chart
  scrollView: {
    position: 'relative'
  },
  // Summary
  summary: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginTop: 20
  },
  sumLeft: {
    alignItems: 'flex-end',
    bottom: -4,
    flex: 1,
    flexDirection: 'row',
    position: 'relative'
  },
  sumAvg: {
    color: '#909CAF',
    fontSize: 25,
    fontWeight: '200'
  },
  sumAvgLabel: {
    color: '909CAF',
    marginLeft: 2,
    position: 'relative',
    top: -3
  },
  sumRight: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  sumPolarItem: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 2
  },
  sumPolarLabel: {
    color: '#909CAF',
    fontSize: 11,
    marginLeft: 3
  },
  sumPolarNumber: {
    color: '#6B7C96',
    fontSize: 15,
    marginLeft: 3,
    position: 'relative',
    top: 1.5
  }
});
