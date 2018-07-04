import React from 'react';
import {
  Picker,
  Animated,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class CategoryPicker extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={pickerStyle.container}>
        <Picker selectedValue={this.props.transaction.category}>
          <Picker.Item label="None" value={'None'} />
          <Picker.Item label="Daily" value={86400000} />
          <Picker.Item label="weekly" value={604800000} />
          <Picker.Item label="bi-weekly" value={1209600000} />
        </Picker>
      </View>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    transaction: state.acctTrans.trans.filter(
      individual => individual.id === ownProps.transactionId
    ),
  };
};

export default connect(mapState)(CategoryPicker);

const pickerStyle = StyleSheet.create({
  container: {
    // position: 'absolute',
    zIndex: 1,
    bottom: 0,
    backgroundColor: '#ffffff',
  },
});
