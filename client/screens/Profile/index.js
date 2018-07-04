import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles, colorTheme } from '../../common/styles';
import { personalityTypes } from '../../data';

// TODO: render reminder Interval for Ostrich only

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const personalityType = personalityTypes.find(
      personality => personality.name === this.props.user.personalityType
    );

    const { user } = this.props;

    return (
      <ScrollView style={{ backgroundColor: colorTheme.blue.medium }}>
        <View style={styles.container}>
          <View>
            <Image
              style={styles.personalityImgSmall}
              source={{ uri: personalityType.imageUrl }}
              resizeMode="stretch"
            />
          </View>

          <Text style={styles.setReminderHeaderText}>ACCOUNT PROFILE</Text>
          <Text style={styles.reminderIntervalSmallText}>
            Email: {user.email}
          </Text>
          <Text style={styles.reminderIntervalSmallText}>
            Personality Type: {user.personalityType}
          </Text>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Set Reminder Interval`}
              onPress={() => {
                this.props.navigation.navigate('ReminderInterval', {
                  title: 'ReminderInterval',
                });
              }}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Take the Quiz!`}
              onPress={() => {
                this.props.navigation.navigate('Quiz', { title: 'Quiz' });
              }}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Link Bank Account`}
              onPress={() => {
                this.props.navigation.navigate('Link', { title: 'Link' });
              }}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Account Settings`}
            />
          </View>


          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Logout`}
              onPress={() => {
                this.props.navigation.navigate('Login', { title: 'Login' });
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    personality: state.personality,
  };
};

export default connect(mapState)(Profile);
