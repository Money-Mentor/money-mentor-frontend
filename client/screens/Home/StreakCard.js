import React, { Component } from 'react';
import { styles, colorTheme } from '../../common/styles';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { bestStreak, currentStreak } from '../../common/index';

export default class StreakCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: props.dateArr,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dateArr !== prevState.dateArr) {
      return {
        ...prevState,
        array: nextProps.dateArr,
      };
    }
    return null;
  }

  render() {
    console.log('these are the props in stack card', this.props, this.state);
    const { array } = this.state;
    return (
      <Card containerStyle={styles.streakCard}>
        <View style={styles.streakCardTextAlign}>
          <View>
            <Text style={styles.streakCardsmallerText}>Current Streak</Text>
            <Text style={styles.streakCardText}>{currentStreak(array)}</Text>
          </View>
          <View>
            <Text style={styles.streakCardsmallerText}>Best Streak</Text>
            <Text style={styles.streakCardText}>{bestStreak(array)}</Text>
          </View>
        </View>
      </Card>
    );
  }
}
