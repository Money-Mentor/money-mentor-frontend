import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../store';
import { styles, colorTheme } from '../common/styles';
import Slider from 'react-native-slider';

class EditCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          name: 'foodAndDrink',
          percentage: 35,
          description: 'Includes groceries, restaurants, bars, nightlife, etc.'
        },
        {
          name: 'travel',
          percentage: 10,
          description: 'Includes gas, commuting, subway, train, bus, etc.'
        },
        {
          name: 'recreation',
          percentage: 15,
          description: 'Includes doctor visits, prescriptions, physicians, etc.'
        },
        {
          name: 'healthcare',
          percentage: 10,
          description: 'Includes doctor visits, prescriptions, physicians, etc.'
        },
        {
          name: 'service',
          percentage: 10,
          description: 'Includes self-care, etc.'
        },
        {
          name: 'community',
          percentage: 10,
          description: 'Includes donations, etc.'
        },
        {
          name: 'shops',
          percentage: 10,
          description: 'Includes presents, clothes, accessories, etc.'
        }
      ],
      maximum: 0
    };
    this.toTitle = this.toTitle.bind(this);
  }
  static navigationOptions = {
    headerStyle: { backgroundColor: colorTheme.blue.medium },
  };
  
  toTitle(str, separator) {
    separator = typeof separator === 'undefined' ? ' ' : separator;
    return str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  }

  componentDidMount() {
    this.props.fetchBudget(this.props.user.id);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {this.props.budget.id && (
            <View>
              <View>
                <View>
                  <Image
                    style={[
                      styles.logo,
                      { marginLeft: 'auto', marginRight: 'auto' }
                    ]}
                    source={require('../../public/img/logo.png')}
                  />
                </View>
                <Text style={[styles.smallerText, { fontSize: 24 }]}>
                  Edit Categories:
                </Text>
                <Text>
                  You have ${this.props.budget.spendingBudget} for your spending
                  budget per month.
                </Text>
                <Text>
                  Below are Penny the Pig's recommendations to get started -
                  adjust the sliders to personalize your budget!
                </Text>
                <Text style={[styles.smallerText, { fontSize: 20 }]}>
                  Percentage Remaining: {this.state.maximum}
                </Text>
              </View>

              {/* All Categories */}
              {this.state.categories.map(category => {
                return (
                  <View key={category.name}>
                    <Text style={[styles.smallerText, { fontSize: 16 }]}>
                      {this.toTitle(category.name)} : {category.percentage}%
                    </Text>
                    <Text>{category.description}</Text>
                    <Slider
                      style={styles.slider}
                      value={category.percentage}
                      onSlidingComplete={value => {
                        this.setState(prevState => ({
                          categories: [...prevState.categories].map(elem => {
                            if (elem.name === category.name) {
                              elem.percentage = value;
                              return elem;
                            } else {
                              return elem;
                            }
                          }),
                          maximum: prevState.maximum - value
                        }));
                      }}
                      step={5}
                      minimumValue={0}
                      maximumValue={100}
                    />
                    <Text>Current Value: {category.percentage}%</Text>
                  </View>
                );
              })}

              {/* Button */}
              <Button
                raised
                buttonStyle={{ backgroundColor: '#92B1BD', borderRadius: 10 }}
                textStyle={{ textAlign: 'center' }}
                title={`Finished!`}
                onPress={() => {
                  this.props.setBudget(this.state.budget);
                  this.props.navigation.navigate('Main', { title: 'Navbar' });
                }}
              >
                Finished!
              </Button>
            </View>
          )}
        </View>
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
