import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../../store';
import { styles, colorTheme } from '../../common/styles';
import Slider from 'react-native-slider';

class EditCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          name: 'foodAndDrink',
          percentage: 35,
          description: 'Includes groceries, restaurants, bars, nightlife, etc.',
        },
        {
          name: 'travel',
          percentage: 10,
          description: 'Includes gas, commuting, subway, train, bus, etc.',
        },
        {
          name: 'recreation',
          percentage: 15,
          description:
            'Includes doctor visits, prescriptions, physicians, etc.',
        },
        {
          name: 'healthcare',
          percentage: 10,
          description:
            'Includes doctor visits, prescriptions, physicians, etc.',
        },
        {
          name: 'service',
          percentage: 10,
          description: 'Includes self-care, etc.',
        },
        {
          name: 'community',
          percentage: 10,
          description: 'Includes donations, etc.',
        },
        {
          name: 'shops',
          percentage: 10,
          description: 'Includes presents, clothes, accessories, etc.',
        },
      ],
      maximum: 0,
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
                <Text style={[styles.smallerText, { fontSize: 24 }]}>
                  Edit Categories:
                </Text>
                <Text style={styles.smallerText}>
                  You have ${this.props.budget.spendingBudget} for your spending
                  budget per month.
                </Text>
                <Text style={[styles.smallerText, { fontSize: 20 }]}>
                  Percentage Remaining: {this.state.maximum}
                </Text>
              </View>
              <View style={{padding:5}}/>
              {/* All Categories */}
              {this.state.categories.map(category => {
                return (
                  <View key={category.name}>
                   <View style={{padding:5}}/>
                    <Text style={[styles.smallerText, { fontSize: 16 }]}>
                      {this.toTitle(category.name)} : {category.percentage}%
                    </Text>
                    <Text style={styles.smallerText}>
                      {category.description}
                    </Text>
                    <Slider
                    trackStyle={styles.track}
                    thumbStyle={styles.thumb}
                    minimumTrackTintColor={colorTheme.orange.medium}
                    maximumTrackTintColor='#b7b7b7'
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
                          maximum: prevState.maximum - value,
                        }));
                      }}
                      step={5}
                      minimumValue={0}
                      maximumValue={100}
                    />
                  </View>
                );
              })}

              {/* Button */}
              <Button
                raised
                buttonStyle={styles.smallOrangeButton}
                textStyle={{ textAlign: 'center' }}
                title={`Finished!`}
                onPress={() => {
                  this.props.setBudget(this.state.budget);
                  this.props.navigation.navigate('Home', { title: 'Home' });
                }}
              >
                Finished!
              </Button>
            </View>
          )}
        <View style={{padding:15}}/>
        </View>
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    budget: state.budget,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchBudget: userId => dispatch(fetchBudget(userId)),
    setBudget: budget => dispatch(setBudget(budget)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(EditCategories);
