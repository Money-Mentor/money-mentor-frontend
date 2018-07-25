import React from 'react';
import { Picker, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { categories } from '../../common';
import { styles } from '../../common/styles';

class CategoryPicker extends React.Component {
  constructor() {
    super();
  }

  render() {
    const transaction = this.props.transaction;
    return (
      <View>
        <Picker onValueChange={event => this.props.changeCategory(event)}>
          {categories.map(category => (
            <Picker.Item label={category} value={category} />
          ))}
        </Picker>
      </View>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    transaction: state.acctTrans.trans.find(
      individual => individual.id === ownProps.transactionId
    ),
  };
};

export default connect(mapState)(CategoryPicker);
