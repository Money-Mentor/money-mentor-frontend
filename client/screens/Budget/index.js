import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Button } from 'react-native-elements';
import BudgetSetup from './BudgetSetup';
import EditCategories from './EditCategories';
import Home from '../Home';
import { styles, pieColor, colorTheme } from '../../common/styles';
import Pie from '../Home/Pie';

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this.getData = this.getData.bind(this);
  }

  _onPieItemSelected(newIndex) {
    this.setState({ ...this.state, activeIndex: newIndex });
  }

  static navigationOptions = {
    title: 'Budget',
    headerStyle: { backgroundColor: colorTheme.blue.medium },
    headerTitleStyle: { color: colorTheme.white.snow }
  };

  getData() {
    const { budget } = this.props;
    let pieData = [];
    let categoriesArr = [
      'community',
      'foodAndDrink',
      'healthcare',
      'recreation',
      'service',
      'shops',
      'travel'
    ];

    for (let key in budget) {
      if (categoriesArr.includes(key)) {
        const properCase = key
          .replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2')
          .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + ' ' + '$2')
          .replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
        pieData.push({ name: properCase, number: budget[key] });
      }
    }

    return pieData;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: colorTheme.blue.medium }}>
          <Pie
            pieWidth={225}
            pieHeight={225}
            onItemSelected={this._onPieItemSelected}
            colors={pieColor}
            data={this.getData()}
          />

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Edit Budget`}
              onPress={() => {
                this.props.navigation.navigate('BudgetSetup', {
                  title: 'BudgetSetup'
                });
              }}
            />
          </View>

          <View style={{ padding: 7 }}>
            <Button
              raised
              buttonStyle={styles.accountProfileButton}
              textStyle={{ textAlign: 'center' }}
              title={`Edit Categories`}
              onPress={() => {
                this.props.navigation.navigate('EditCategories', {
                  title: 'EditCategories'
                });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    budget: state.acctTrans.budget
  };
};

const BudgetConnect = connect(mapState)(Budget);

export default BudgetConnect;

export const BudgetStack = createStackNavigator({
  Budget: { screen: BudgetConnect },
  BudgetSetup: { screen: BudgetSetup },
  EditCategories: { screen: EditCategories },
  Home: { screen: Home }
});
