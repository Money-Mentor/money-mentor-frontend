import React from 'react';
import { ListItem, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from '../../common/styles';
import { Text, View, Switch } from 'react-native';
import { transactionIconType } from '../../common/index';
import { connect } from 'react-redux';
import { updateTrans, fetchAcctTransData } from '../../store';
import CategoryPicker from './CategoryPicker';
import { categories } from '../../common';

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      picker: false,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
    this.includedToggle = this.includedToggle.bind(this);
    this.togglePicker = this.togglePicker.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.transaction.included !== prevProps.transaction.included ||
      this.props.transaction.category !== prevProps.transaction.category
    ) {
      this.props.fetchAcctTransData();
    }
  }

  toggleInfo() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  togglePicker() {
    this.setState({
      picker: !this.state.picker,
    });
  }

  includedToggle(input) {
    this.props.updateTrans({
      ...this.props.transaction,
      included: !this.props.transaction.included,
    });
  }

  changeCategory(event) {
    this.props.updateTrans({
      ...this.props.transaction,
      category1: event,
    });
    this.setState({
      picker: false,
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

    const info = (
      <View style={styles.transBody}>
        <View style={[styles.transDetail]}>
          <Text style={styles.transTextBold}> INCLUDED IN BUDGET: </Text>
          <Switch
            value={this.props.transaction.included}
            onValueChange={() => this.includedToggle()}
          />
        </View>
        <View>
          <View style={[styles.transDetail]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.transTextBold}> CATEGORY: </Text>
              <Text>{transaction.category1}</Text>
            </View>
            {categories.indexOf(transaction.category1) >= 0 &&
              this.state.picker === false && (
                <View style={{ position: 'relative', left: 20 }}>
                  <Button
                    raised
                    buttonStyle={styles.editButton}
                    textStyle={{ textAlign: 'center' }}
                    title={`Edit`}
                    onPress={() => this.togglePicker()}
                  />
                </View>
              )}
          </View>
          {this.state.picker && (
            <CategoryPicker
              transactionId={transaction.id}
              changeCategory={this.changeCategory}
            />
          )}
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
          onPress={() => this.toggleInfo()}
          rightIcon={<Icon name={icon} />}
          leftIcon={{
            name: transactionIconType[transaction.category2],
          }}
        />

        {this.state.expanded && info}
      </View>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    updateTrans: trans => dispatch(updateTrans(trans)),
    fetchAcctTransData: () => dispatch(fetchAcctTransData()),
  };
};

export default connect(
  null,
  mapDispatch
)(Transaction);
