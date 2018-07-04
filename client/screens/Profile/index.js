import React, { Component } from 'react';
import ReminderInterval from './ReminderInterval';
import { styles } from '../../common/styles';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
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
      <View style={styles.container}>
        <View style={styles.initialLogoLocation}>
          <Image
            style={{
              alignSelf: 'center',
              height: 300,
              width: 350,
              borderWidth: 1,
              borderColor: 'white',
            }}
            source={{ uri: personalityType.imageUrl }}
            resizeMode="stretch"
          />
        </View>

        <Text style={styles.questionText}>ACCOUNT PROFILE</Text>
        <Text style={styles.sliderSmallText}>Email: {user.email}</Text>
        <Text style={styles.sliderSmallText}>
          Personality Type: {user.personalityType}
        </Text>

        {/* <Text style={styles.text}>Set Reminder Inteval!</Text> */}
        {/* <ReminderInterval /> */}

        <Button
          raised
          buttonStyle={styles.bluebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Set Reminder Interval`}
          onPress={() => {
            this.props.navigation.navigate('ReminderInterval', {
              title: 'ReminderInterval',
            });
          }}
        />

        <Button
          raised
          buttonStyle={styles.bluebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Take the Quiz!`}
          onPress={() => {
            this.props.navigation.navigate('Quiz', { title: 'Quiz' });
          }}
        />

        <Button
          raised
          buttonStyle={styles.bluebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Account Settings`}
        />

        <Button
          raised
          buttonStyle={styles.bluebutton}
          textStyle={{ textAlign: 'center' }}
          title={`Logout`}
        />

        <Button
            raised
            buttonStyle={styles.bluebutton}
            textStyle={{ textAlign: 'center' }}
            title={`Link Bank Account →`}
            onPress={async () => {
              await this.props.handleSubmit(
                this.state.email,
                this.state.password
              );

              // await this.setState({ status: 'PLAID' });
            }}
          />
      </View>
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
