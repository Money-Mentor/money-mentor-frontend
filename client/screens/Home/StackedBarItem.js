'use strict';

import React, {
  Component,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const barWidth = 15;

export default class StackedBarItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      color,
      low,
      high,
      value,
      unitHeight,
      barInterval,
      barItemTop
    } = this.props;
    
    let entity;
    let empty;
    let wrapperStyle = {};
    if (value >= 0) {
      entity = value;
      empty = high - value;
    } else {
      entity = Math.abs(value);
      empty = Math.abs(low) - entity;
      wrapperStyle = {
        top: high * unitHeight,
        right: barInterval,
        transform: [
          {
            rotate: '180deg'
          }
        ]
      };
    }

    const baseStyle = {
      backgroundColor: color,
      marginRight: barInterval
    };

    return (
      <TouchableHighlight underlayColor="transparent">
        <View style={[styles.container, { marginTop: barItemTop }]}>
          <View style={[styles.barWrapper, wrapperStyle]}>
            <View
              style={[
                styles.bar,
                styles.empty,
                Object.assign({}, baseStyle, { height: empty * unitHeight })
              ]}
            />
            <View
              style={[
                styles.bar,
                Object.assign({}, baseStyle, { height: entity * unitHeight })
              ]}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  // Bar
  barWrapper: {
    position: 'relative'
  },
  bar: {
    width: barWidth
  },
  empty: {
    opacity: 0.2
  }
});
