import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../store';
import { styles } from '../common/styles';
import Slider from 'react-native-slider';

class EditCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          foodAndDrink: 35,
          description: 'Includes groceries, restaurants, bars, nightlife, etc.'
        },
        { travel: 10, description: 'Includes gas, commuting, etc.' },
        {
          recreation: 15,
          description: 'Includes doctor visits, prescriptions, physicians, etc.'
        },
        {
          healthcare: 10,
          description: 'Includes doctor visits, prescriptions, physicians, etc.'
        },
        {
          service: 10,
          description: ''
        },
        {
          community: 10,
          description: ''
        },
        {
          shops: 10,
          description: ''
        }
      ]
    };
  }

  componentDidMount() {
    this.props.fetchBudget(this.props.user.id);
  }

  render() {
    console.log('****************CATEGORIES:', this.state.categories);
    return (
      <ScrollView>
        {this.props.budget.id && (
          <View>
            <View>
              <View style={styles.logoLocation}>
                <Image source={require('../../public/img/logo.png')} />
              </View>
              <Text>Edit Categories:</Text>
              <Text>
                Below are Penny the Pig's recommendations to get started -
                adjust the sliders to personalize your budget!
              </Text>
            </View>

            {/* All Categories */}
            {this.state.categories.map(category => {
              let key = Object.keys(category)[0];
              return (
                <View key={key}>
                  <Text>{key}</Text>
                  <Text>{category.description}</Text>
                  <Slider
                    value={category[key]}
                    onSlidingComplete={value => {
                      // let index = this.state.categories.indexOf()
                      // let index = this.state.categories.findIndex(
                      //   x => x[key] === this.state.categories[key]
                      // );
                      // if (index === -1) {
                      //   console.log('Uh oh!');
                      // }
                      // const changedObj = this.state.categories[index];
                      // changedObj.key = value;
                      // console.log('***** NEW OBJ', changedObj);
                      // this.setState({
                      //   categories: [
                      //     ...this.state.categories.slice(0, index),
                      //     Object.assign({}, this.state.categories[key], value),
                      //     ...this.state.categories.slice(index + 1)
                      //   ]
                      // });
                    }}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                  />
                </View>
              );
            })}

            {/* Button */}
            <Button
              raised
              buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
              textStyle={{ textAlign: 'center' }}
              title={`Submit`}
              onPress={() => {
                this.props.setBudget(this.state.budget);
                this.props.navigation.navigate('Home', { title: 'Home' });
              }}
            >
              Finished!
            </Button>
          </View>
        )}
      </ScrollView>
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
