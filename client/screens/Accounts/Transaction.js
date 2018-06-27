import React from 'react';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../common/styles';
import { Text, View } from 'react-native';

class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.state.expanded
      ? this.setState({
          expanded: false,
        })
      : this.setState({
          expanded: true,
        });
  }

  render() {
    const icons = {
      up: 'chevron-up',
      down: 'chevron-down',
    };

    let icon = icons.down;

    if (this.state.expanded) {
      icon = icons.up;
    } else {
      icon = icons.down;
    }

    const transaction = this.props.transaction;

    console.log('======', this.props.transaction);
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
        <View style={styles.trans}>
          <View style={styles.estyles}>
            <Text>{transaction.category1}</Text>
          </View>
          <View style={styles.estyles}>
            <Text>{transaction.category1}</Text>
          </View>
          <View style={styles.estyles}>
            <Text>{transaction.category1}</Text>
          </View>
          <View style={styles.estyles}>
            <Text>{transaction.category1}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Transaction;
