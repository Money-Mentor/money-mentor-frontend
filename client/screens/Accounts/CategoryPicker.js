import React from "react";
import {
  Picker,
  View,
  Text,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { categories } from "../../common";

class CategoryPicker extends React.Component {
  constructor() {
    super();
  }

  render() {
    const transaction = this.props.transaction;

    return (
      <View>
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
    transaction: state.acctTrans.trans.find(
      individual => individual.id === ownProps.transactionId
    )
  };
};

export default connect(mapState)(CategoryPicker);


// {categories.map(category => (
//   <Picker.Item label={category} value={category} />
