import React from 'react';
import { styles, colorTheme } from '../../common/styles';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { bestStreak, currentStreak } from '../../common/index';

const StreakCard = props => {
  const { dateArr } = props;
  return (
    <Card containerStyle={styles.streakCard}>
      <View style={styles.streakCardTextAlign}>
        <View>
          <Text style={styles.streakCardsmallerText}>Current Streak</Text>
          <Text style={styles.streakCardText}>{currentStreak(dateArr)}</Text>
        </View>
        <View>
          <Text style={styles.streakCardsmallerText}>Best Streak</Text>
          <Text style={styles.streakCardText}>{bestStreak(dateArr)}</Text>
        </View>
      </View>
    </Card>
  );
};

export default StreakCard;
