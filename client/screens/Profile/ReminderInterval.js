import React, { Component } from 'react';
import { Text, View, Picker, AppState } from 'react-native';
import { styles, colorTheme } from '../../common/styles';
import { connect } from 'react-redux';
import { updateUserInterval } from '../../store/user';

class ReminderInterval extends Component {
  constructor(props) {
    super(props);

    this.state = {
      interval: 0,
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium },
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      console.log('app is in background', this.state.interval);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.setReminderHeaderText}>Set Reminder Interval!</Text>
        <Text style={styles.reminderIntervalSmallText}>We understand it can be overwhelming to check your finances. Let us make your life easier by setting a reminder.</Text>

        <Picker
          style={styles.picker}
          selectedValue={this.state.interval}
          onValueChange={interval => {
            user.reminderInterval = interval;
            this.setState({ interval });
            this.props.updateUserInterval(user);
          }}
        >
          <Picker.Item color="white" label="None" value={0} />
          <Picker.Item color="white" label="Daily" value={86400000} />
          <Picker.Item color="white" label="weekly" value={604800000} />
          <Picker.Item color="white" label="bi-weekly" value={1209600000} />
        </Picker>
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
  };
};

const mapDispatch = dispatch => {
  return {
    updateUserInterval: user => dispatch(updateUserInterval(user)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(ReminderInterval);
