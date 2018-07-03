import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchBudget, setBudget } from '../../store';
import { styles, colorTheme, deviceWidth } from '../../common/styles';
import Slider from 'react-native-slider';

class EditCategories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          name: 'foodAndDrink',
          percentage: 35,
          description: '(Groceries, restaurants, bars, nightlife, etc.)',
        },
        {
          name: 'travel',
          percentage: 10,
          description: '(Gas, subway, train, bus, etc.)',
        },
        {
          name: 'recreation',
          percentage: 15,
          description: '(Arts and entertainment, sports, outdoors, etc.)',
        },
        {
          name: 'healthcare',
          percentage: 10,
          description: '(Doctor visits, prescriptions, physicians, etc.)',
        },
        {
          name: 'service',
          percentage: 10,
          description: '(Self-care, automotive, financial, home repair, etc.)',
        },
        {
          name: 'community',
          percentage: 10,
          description: '(Education, donations, offering, etc.)',
        },
        {
          name: 'shops',
          percentage: 10,
          description: '(Presents, clothes, accessories, etc.)',
        },
      ],
      remaining: 0,
    };
    this.toTitle = this.toTitle.bind(this);
    this.showDescription = this.showDescription.bind(this);
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

  showDescription(str) {
    const category = this.state.categories.filter(elem => elem.name === str);
    return <Text>{category.description}</Text>;
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
                <Text style={[styles.initialScreenText, { fontSize: 30 }]}>
                  Edit Your Budget
                </Text>
                <View style={[categoryStyles.introInfo, { paddingTop: 40 }]}>
                  <Text
                    style={[
                      styles.editCategoryText,
                      categoryStyles.introInfoBig,
                    ]}
                  >
                    {this.state.remaining}%
                  </Text>
                  <Text
                    style={[
                      styles.editCategoryText,
                      categoryStyles.introInfoBig,
                    ]}
                  >
                    ${this.props.budget.spendingBudget}
                  </Text>
                </View>

                <View style={[categoryStyles.introInfo, { paddingBottom: 40 }]}>
                  <Text
                    style={[
                      styles.editCategoryText,
                      categoryStyles.introIntroSmall,
                    ]}
                  >
                    remaining
                  </Text>
                  <Text
                    style={[
                      styles.editCategoryText,
                      categoryStyles.introIntroSmall,
                    ]}
                  >
                    to spend
                  </Text>
                </View>
              </View>
              <View style={{ padding: 5 }} />
              {/* All Categories */}
              {this.state.categories.map(category => {
                return (
                  <Card key={category.name} containerStyle={{ margin: 30 }}>
                    <View key={category.name}>
                      <View style={{ padding: 5, width: '100%' }} />
                      <View style={styles.editCategoryView}>
                        <Text style={styles.smallerText}>
                          {this.toTitle(category.name)}
                        </Text>

                        <Text style={styles.smallerText}>
                          {category.percentage}%
                        </Text>
                      </View>

                      <Slider
                        trackStyle={styles.track}
                        thumbStyle={styles.thumb}
                        minimumTrackTintColor={colorTheme.orange.medium}
                        maximumTrackTintColor="#b7b7b7"
                        style={styles.slider}
                        value={category.percentage}
                        onSlidingComplete={value => {
                          this.setState(prevState => {
                            const remaining =
                              prevState.remaining +
                              (category.percentage - value);
                            return {
                              categories: [...prevState.categories].map(
                                elem => {
                                  if (elem.name === category.name) {
                                    elem.percentage = value;
                                    return elem;
                                  } else {
                                    return elem;
                                  }
                                }
                              ),
                              remaining: remaining,
                            };
                          });
                        }}
                        step={5}
                        minimumValue={0}
                        maximumValue={100}
                      />
                    </View>
                  </Card>
                );
              })}

              {/* Button */}
              <Button
                raised
                disabled={this.state.remaining === 0 ? false : true}
                buttonStyle={styles.budgetOrangeButton}
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

const categoryStyles = StyleSheet.create({
  introInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  introIntroSmall: { fontSize: 20, color: '#ffffff', textAlign: 'center' },
  introInfoBig: { fontSize: 40, color: '#ffffff', textAlign: 'center' },
});

export default connect(
  mapState,
  mapDispatch
)(EditCategories);
