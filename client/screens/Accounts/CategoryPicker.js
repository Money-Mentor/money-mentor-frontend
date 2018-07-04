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
        <Picker
          onValueChange={this.props.changeCategory}
        >
<Picker.Item label="hello" value="hello" />
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
    )
  };
};

export default connect(mapState)(CategoryPicker);


// {categories.map(category => (
//   <Picker.Item label={category} value={category} />
