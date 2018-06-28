import React from "react";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles, estyles } from "../../common/styles";
import { Text, View } from "react-native";

class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const icons = {
      up: "chevron-up",
      down: "chevron-down"
    };

    let icon = icons.down;

    if (this.state.expanded) {
      icon = icons.up;
    } else {
      icon = icons.down;
    }

    const transaction = this.props.transaction;

    const info = (
      <View style={styles.transBody}>
        <View style={estyles.transInner}>
          <Text style={{ fontWeight: "bold" }}> Date: </Text>
          <Text>{transaction.date}</Text>
        </View>
        <View style={estyles.transInner}>
          <Text style={{ fontWeight: "bold" }}> Category: </Text>
          <Text>
            {transaction.category1}, {transaction.category2}
          </Text>

          <Button
            raised
            buttonStyle={{ backgroundColor: "#92B1BD", borderRadius: 10 }}
            textStyle={{ textAlign: "center" }}
            title={`Update`}
          />
        </View>
      </View>
    );
    return (
      <View>
        <ListItem
          key={transaction.id}
          title={transaction.name}
          subtitle={transaction.categoty1}
          rightTitle={`$ ${transaction.amount}`}
          onPress={() => this.toggle()}
          rightIcon={<Icon name={icon} />}
        />

        {this.state.expanded && info}
      </View>
    );
  }
}

export default Transaction;
