import React from 'react';
import { Text, View } from 'react-native';
import ReminderInterval from './ReminderInterval';
import { styles } from '../../common/styles';

// TODO: render reminder Interval for Ostrich only

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Profile</Text>
      <ReminderInterval />
    </View>
  )
}

export default Profile;
