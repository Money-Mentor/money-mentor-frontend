import React, { Component } from 'react';
import ViewPropTypes from 'react-native';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import Svg, { G, Rect, Text } from 'react-native-svg';
import { styles, colorTheme } from '../../common/styles';
import _ from 'lodash';

import {
  DAYS_IN_WEEK,
  MILLISECONDS_IN_ONE_DAY,
  MONTH_LABELS,
  shiftDate,
  getBeginningTimeForDate,
  convertToDate,
  getDaysBetween,
} from '../../common';

const SQUARE_SIZE = 24;
const MONTH_LABEL_GUTTER_SIZE = 0;

export default class CalendarHeatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCache: this.getValueCache(props.values),
    };
    this.getValueCache = this.getValueCache.bind(this);
    this.getSquareSizeWithGutter = this.getSquareSizeWithGutter.bind(this);
    this.getStartDate = this.getStartDate.bind(this);
    this.endDate = this.getEndDate.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.values !== prevProps.values) {
      this.setState({
        valueCache: this.getValueCache(this.props.values),
      });
    }
  }

  getSquareSizeWithGutter() {
    return SQUARE_SIZE + this.props.gutterSize;
  }

  getMonthLabelSize() {
    if (!this.props.showMonthLabels) {
      return 0;
    } else if (this.props.horizontal) {
      return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;
    }
    return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE);
  }

  getStartDate() {
    return getBeginningTimeForDate(convertToDate(this.props.startDate));
  }

  getEndDate() {
    return getBeginningTimeForDate(convertToDate(this.props.endDate));
  }

  getStartDateWithEmptyDays() {
    return shiftDate(this.getStartDate(), -this.getNumEmptyDaysAtStart());
  }

  getNumEmptyDaysAtStart() {
    return this.getStartDate().getDay();
  }

  getNumEmptyDaysAtEnd() {
    return DAYS_IN_WEEK - 1 - this.getEndDate().getDay();
  }
  getNumDays() {
    return getDaysBetween(this.getEndDate(), this.getStartDate());
  }

  getWeekCount() {
    const numDaysRoundedToWeek =
      this.getNumDays() +
      this.getNumEmptyDaysAtStart() +
      this.getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  }

  getWeekWidth() {
    return DAYS_IN_WEEK * this.getSquareSizeWithGutter();
  }

  getWidth() {
    return (
      this.getWeekCount() * this.getSquareSizeWithGutter() -
      this.props.gutterSize
    );
  }

  getHeight() {
    return (
      this.getWeekWidth() + (this.getMonthLabelSize() - this.props.gutterSize)
    );
  }

  getValueCache(values) {
    const result = _.reduce(
      values,
      (memo, value) => {
        const date = convertToDate(value.date);
        const index = Math.floor(
          (date - this.getStartDateWithEmptyDays()) / MILLISECONDS_IN_ONE_DAY
        );
        memo[index] = {
          value,
        };
        return memo;
      },
      {}
    );
    return result;
  }

  getClassNameForIndex(index) {
    const rectColor = this.props.color;
    if (this.state.valueCache[index]) {
      return rectColor[this.state.valueCache[index].value.count];
    }
    return rectColor[0];
  }

  getTransformForWeek(weekIndex) {
    if (this.props.horizontal) {
      return [weekIndex * this.getSquareSizeWithGutter(), 50];
    }
    return [10, weekIndex * this.getSquareSizeWithGutter()];
  }

  getTransformForMonthLabels() {
    if (this.props.horizontal) {
      return null;
    }
    return `${this.getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, 0`;
  }

  getTransformForAllWeeks() {
    if (this.props.horizontal) {
      return `0, ${this.getMonthLabelSize() - 100}`;
    }
    return null;
  }

  getViewBox() {
    if (this.props.horizontal) {
      return `${this.getWidth()} ${this.getHeight()}`;
    }
    return `${this.getHeight()} ${this.getWidth()}`;
  }

  getSquareCoordinates(dayIndex) {
    if (this.props.horizontal) {
      return [0, dayIndex * this.getSquareSizeWithGutter()];
    }
    return [dayIndex * this.getSquareSizeWithGutter(), 0];
  }

  getMonthLabelCoordinates(weekIndex) {
    if (this.props.horizontal) {
      return [
        weekIndex * this.getSquareSizeWithGutter(),
        this.getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE,
      ];
    }
    const verticalOffset = -2;
    return [
      0,
      (weekIndex + 1) * this.getSquareSizeWithGutter() + verticalOffset,
    ];
  }

  handleClick(value) {
    if (this.props.onPress) {
      this.props.onPress(value);
    }
  }

  renderSquare(dayIndex, index) {
    const indexOutOfRange =
      index < this.getNumEmptyDaysAtStart() - 1 ||
      index >= this.getNumEmptyDaysAtEnd() + this.getNumDays() + 1;
    if (indexOutOfRange && !this.props.showOutOfRangeDays) {
      return null;
    }
    const [x, y] = this.getSquareCoordinates(dayIndex);
    return (
      <Rect
        key={index}
        width={SQUARE_SIZE}
        height={SQUARE_SIZE}
        x={x}
        y={y}
        onPress={() => this.handleClick(index)}
        fill={this.getClassNameForIndex(index)}
      />
    );
  }

  renderWeek(weekIndex) {
    const [x, y] = this.getTransformForWeek(weekIndex);
    return (
      <G key={weekIndex} x={x} y={y}>
        {_
          .range(DAYS_IN_WEEK)
          .map(dayIndex =>
            this.renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
          )}
      </G>
    );
  }

  renderAllWeeks() {
    return _
      .range(this.getWeekCount())
      .map(weekIndex => this.renderWeek(weekIndex));
  }

  renderMonthLabels() {
    if (!this.props.showMonthLabels) {
      return null;
    }
    const weekRange = _.range(this.getWeekCount() - 1); // don't render for last week, because label will be cut off
    return weekRange.map(weekIndex => {
      const endOfWeek = shiftDate(
        this.getStartDateWithEmptyDays(),
        (weekIndex + 1) * DAYS_IN_WEEK
      );
      const [x, y] = this.getMonthLabelCoordinates(weekIndex);
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <Text
          key={weekIndex}
          x={x}
          y={y}
          fontSize="16"
          fontWeight="bold"
          fill={colorTheme.white.snow}
        >
          {MONTH_LABELS[endOfWeek.getMonth()]}
        </Text>
      ) : null;
    });
  }

  render() {
    return (
      <ScrollView>
        <Svg height={this.getHeight() + 125} width={this.getWidth()}>
          <G>{this.renderMonthLabels()}</G>
          <G>{this.renderAllWeeks()}</G>
        </Svg>
      </ScrollView>
    );
  }
}

CalendarHeatmap.ViewPropTypes = {
  values: PropTypes.arrayOf(
    // array of objects with date and arbitrary metadata
    PropTypes.shape({
      date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
    }).isRequired
  ).isRequired,
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date),
  ]), // end of date range
  gutterSize: PropTypes.number, // size of space between squares
  horizontal: PropTypes.bool, // whether to orient horizontally or vertically
  showMonthLabels: PropTypes.bool, // whether to show month labels
  showOutOfRangeDays: PropTypes.bool, // whether to render squares for extra days in week after endDate, and before start date
  classForValue: PropTypes.func, // function which returns html class for value
  onPress: PropTypes.func, // callback function when a square is clicked
};

CalendarHeatmap.defaultProps = {
  startDate: '2018-05-01',
  endDate: new Date(),
  gutterSize: 1,
  horizontal: true,
  showMonthLabels: true,
  showOutOfRangeDays: false,
  classForValue: value => (value ? 'black' : '#8cc665'),
  onPress: () => console.log('change onPress prop'),
};
