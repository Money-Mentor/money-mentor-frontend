import React from "react";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../common/styles";
import { Text, View, Switch } from "react-native";
import { Button } from "react-native-elements";
import { transactionIconType } from '../../common/index';
import { connect } from 'react-redux';
import {updateTrans} from '../../store'

class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      included: true,
      category: ''
    };
    this.toggle = this.toggle.bind(this);
    this.categoryToggle = this.categoryToggle.bind(this);
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  categoryToggle(event) {
    console.log(event)

    // this.setState({
    //   included: event.target.value
    // })
    // updateTrans({included: this.state.included, category: this.state.category})
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
        <View>
          <Text style={{ fontWeight: "bold" }}> Date: </Text>
          <Text>{transaction.date}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}> Category: </Text>
          <Text>
            {transaction.category1}, {transaction.category2}
          </Text>

          <View>
          <Text style={{ fontWeight: "bold" }}> Included in Budget: </Text>
          <Switch value={true} onValueChange={this.categoryToggle}/>
        </View>

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
          leftIcon={{
            name: transactionIconType[transaction.category2]
          }}
        />

        {this.state.expanded && info}
      </View>
    );
  }
}

export default Transaction;
