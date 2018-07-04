import React, { Component } from 'react';
import { Text, View, Picker, AppState } from 'react-native';
import { styles } from '../../common/styles';
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

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if(appState === 'background') {
      // TODO: Schedule background notification
      console.log('app is in background', this.state.interval);
    }
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Set Reminder Inteval!</Text>

        <Picker
          style={styles.picker}
          selectedValue={this.state.interval}
          onValueChange={(interval) => {
            user.reminderInterval = interval;
            this.setState({ interval });
            this.props.updateUserInterval(user);
          }}
        >
          <Picker.Item label="None" value={"None"} />
          <Picker.Item label="Daily" value={86400000} />
          <Picker.Item label="weekly" value={604800000} />
          <Picker.Item label="bi-weekly" value={1209600000} />
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
    updateUserInterval: user => dispatch(updateUserInterval(user))
  };
};

export default connect(mapState, mapDispatch)(ReminderInterval);
