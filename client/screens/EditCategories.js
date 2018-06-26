import React from 'react';
import { View, Text, Image } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../store';
import { styles } from '../common/styles';
import Slider from 'react-native-slider';

class EditCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      budget: {
        foodAndDrink: 35,
        travel: 10,
        recreation: 15,
        healthcare: 10,
        service: 10,
        community: 10,
        shops: 10
      }
    };
  }

  componentDidMount() {
    this.props.fetchBudget(this.props.user.id);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.budget.id && (
          <View>
            <View style={styles.logoLocation}>
              <Image source={require('../../public/img/logo.png')} />
              <Text style={styles.initialScreenText}>
                You have {this.props.budget.spendingBudget} for your monthly
                spending budget.
              </Text>
              <Text style={styles.budgetSetupText}>
                Here is the recommended budget setup:
              </Text>
              <Text>Food and Drink:</Text>
              {/* <Slider
                style={styles.slider}
                value={this.state.budget.foodAndDrink}
                defaultValue={35}
                // onValueChange={value => this.setState({ foodAndDrink: value })}
                step={1}
                minimumValue={0}
                maximumValue={100}
              /> */}
            </View>
            <View style={{ padding: 10 }}>
              <Button
                raised
                buttonStyle={styles.button}
                textStyle={{ textAlign: 'center' }}
                title={`Submit`}
                onPress={() => {
                  this.props.setBudget(this.state.budget);
                  this.props.navigation.navigate('Home', {
                    title: 'Home'
                  });
                }}
              >
                Finished!
              </Button>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    budget: state.budget
  };
};

const mapDispatch = dispatch => {
  return {
    fetchBudget: userId => dispatch(fetchBudget(userId)),
    setBudget: budget => dispatch(setBudget(budget))
  };
};

export default connect(
  mapState,
  mapDispatch
)(EditCategories);
