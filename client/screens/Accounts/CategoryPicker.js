import React from "react";
import {
  Picker,
  Animated,
  TouchableHighlight,
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
      <View style={pickerStyle.container}>
        <Picker
          onValueChange={this.props.changeCategory}
        >
          {categories.map(category => (
            <Picker.Item label={category[1]} value={category[1]} />
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

const pickerStyle = StyleSheet.create({
  container: {
    // position: 'absolute',
    zIndex: 1,
    bottom: 0,
    backgroundColor: "#ffffff"
  }
});
