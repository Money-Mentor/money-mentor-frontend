import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ART,
  LayoutAnimation,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles, pieColor, colorTheme } from '../../common/styles';

const { Surface, Group, Rectangle, Shape } = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import AnimShape from './AnimShape';

const d3 = {
  scale,
  shape,
};

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { highlightedIndex: 0 };
    this._createPieChart = this._createPieChart.bind(this);
    this._value = this._value.bind(this);
    this._label = this._label.bind(this);
    this._color = this._color.bind(this);
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
  }

  // methods used to tranform data into piechart:
  // TODO: Expose them as part of the interface
  _value(item) {
    return item.number;
  }

  _label(item) {
    return item.name;
  }

  _color(index) {
    return pieColor[index];
  }

  _createPieChart(index) {
    var arcs = d3.shape.pie().value(this._value)(this.props.data);

    var hightlightedArc = d3.shape
      .arc()
      .outerRadius(this.props.pieWidth / 2 + 10)
      .padAngle(0.05)
      .innerRadius(30);

    var arc = d3.shape
      .arc()
      .outerRadius(this.props.pieWidth / 2)
      .padAngle(0.05)
      .innerRadius(30);

    var arcData = arcs[index];
    var path =
      this.state.highlightedIndex == index
        ? hightlightedArc(arcData)
        : arc(arcData);

    return {
      path,
      color: this._color(index),
    };
  }

  _onPieItemSelected(index) {
    this.setState({ ...this.state, highlightedIndex: index });
    this.props.onItemSelected(index);
  }

  render() {
    return (
      <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
        <Surface width="400" height="425">
          <Group x={200} y={125}>
            {this.props.data.map((item, index) => (
              <AnimShape
                key={'pie_shape_' + index}
                color={this._color(index)}
                d={() => this._createPieChart(index)}
              />
            ))}
          </Group>
        </Surface>
        <View style={styles.textContainer}>
          {this.props.data.map((item, index) => {
            var fontWeight =
              this.state.highlightedIndex == index ? 'bold' : 'normal';
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this._onPieItemSelected(index)}
              >
                <View>
                  <Text style={[styles.label, { fontWeight: fontWeight }]}>
                    {this._label(item)}: {this._value(item)}%
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Pie;
