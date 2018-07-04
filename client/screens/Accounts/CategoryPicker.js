<<<<<<< HEAD
import React from "react";
import {
  Picker,
  View,
  Text,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { categories } from "../../common";
import { styles } from '../../common/styles';
=======
import React from 'react';
import {
  Picker,
  Animated,
  TouchableHighlight,
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
>>>>>>> master

class CategoryPicker extends React.Component {
  constructor() {
    super();
  }

  render() {
<<<<<<< HEAD
    const transaction = this.props.transaction;
    console.log('transaction.id from CategoryPicker', transaction.id)

    return (
      <View>
        <Picker onValueChange={(event) => this.props.changeCategory(event)}>
          {categories.map(category => <Picker.Item label={category} value={category} />)}
=======
    return (
      <View style={pickerStyle.container}>
        <Picker selectedValue={this.props.transaction.category}>
          <Picker.Item label="None" value={'None'} />
          <Picker.Item label="Daily" value={86400000} />
          <Picker.Item label="Weekly" value={604800000} />
          <Picker.Item label="Bi-Weekly" value={1209600000} />
>>>>>>> master
        </Picker>
      </View>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
<<<<<<< HEAD
    transaction: state.acctTrans.trans.find(
=======
    transaction: state.acctTrans.trans.filter(
>>>>>>> master
      individual => individual.id === ownProps.transactionId
    )
  };
};

export default connect(mapState)(CategoryPicker);
<<<<<<< HEAD
=======

const pickerStyle = StyleSheet.create({
  container: {
    // position: 'absolute',
    zIndex: 1,
    bottom: 0,
    backgroundColor: '#ffffff'
  }
});
>>>>>>> master
