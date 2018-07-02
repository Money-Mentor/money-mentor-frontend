import React, { Component } from 'react';
import { Text, View, Picker, AppState } from 'react-native';
import { styles } from '../../common/styles';

export default class ReminderInterval extends Component {
  constructor(props) {
    super(props)

    this.state={
      interval: 0,
    }

    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handleAppStateChange(appState) {
    if(appState === 'background') {
      // TODO: Schedule background notification
      console.log('app is in background', this.state.interval)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Set Reminder Inteval!</Text>

        <Picker
          style={styles.picker}
          selectedValue={this.state.interval}
          onValueChange={(interval) => this.setState({ interval })}
        >
          <Picker.Item label="None" value={"None"} />
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
        </Picker>

      </View>
    )
  }
}
