import React from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { personalityTypes } from '../../data';
import { updateUserPersonality } from '../../store/user';
import { setBudget } from '../../store/budget';
import { styles } from '../../common/styles';
import { Button } from 'react-native-elements';

class Result extends React.Component {
  constructor() {
    super();
    this.determineBudget = this.determineBudget.bind(this);
  }

  static navigationOptions = {
    title: 'Result'
  };

  componentDidMount() {
    this.props.user.personalityType = this.props.personality;
    const updatedUser = this.props.user;
    this.props.updateUserPersonality(this.props.user.id, updatedUser);
  }

  determineBudget(personality) {
    if (
      personality === 'Social Value Spender' ||
      personality === 'Cash Splasher'
    ) {
      return {
        ...this.props.budget,
        foodAndDrink: 25,
        travel: 10,
        recreation: 10,
        healthcare: 15,
        service: 15,
        community: 15,
        shops: 10
      };
    } else if (personality === 'Ostrich') {
      return {
        ...this.props.budget,
        foodAndDrink: 30,
        travel: 10,
        recreation: 15,
        healthcare: 10,
        service: 10,
        community: 15,
        shops: 10
      };
    } else if (personality === 'Hoarder' || personality === 'Inconclusive') {
      return {
        ...this.props.budget,
        foodAndDrink: 35,
        travel: 10,
        recreation: 15,
        healthcare: 10,
        service: 10,
        community: 10,
        shops: 10
      };
    }
  }

  render() {
    const personalityType = personalityTypes.find(
      personality => personality.name === this.props.personality
    );

    console.log(personalityType.name);

    console.log(this.determineBudget(personalityType.name));

    return (
      <View style={styles.container}>
        {personalityType &&
          (personalityType === 'Inconclusive' ? (
            <View>
              <Text style={styles.questionText}>
                Uh Oh. Inconclusive! We're not sure what your personality type
                is - but we are sure you want to keep track of your spending!
                Take a look at our home page.
              </Text>
            </View>
          ) : (
            <View>
              <View>
                <Image
                  style={{
                    alignSelf: 'center',
                    height: 300,
                    width: 350,
                    borderWidth: 1,
                    borderColor: 'white'
                  }}
                  source={{ uri: personalityType.imageUrl }}
                  resizeMode="stretch"
                />
                <Text style={[styles.questionText, { fontSize: 28 }]}>
                  {personalityType.name}
                </Text>
                <Text
                  style={[
                    styles.questionText,
                    { fontSize: 12, fontWeight: 'normal' }
                  ]}
                >
                  {personalityType.description}
                </Text>
              </View>
            </View>
          ))}

        <View>
          <Button
            buttonStyle={styles.smallOrangeButton}
            textStyle={{ textAlign: 'center' }}
            title={`Set Budget By Personality`}
            onPress={() => {
              this.props.setBudget(this.determineBudget(personalityType.name));
              this.props.navigation.navigate('EditCategories', {
                title: 'EditCategories'
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    personality: state.personality,
    budget: state.budget
  };
};

const mapDispatch = dispatch => {
  return {
    setBudget: budget => dispatch(setBudget(budget)),
    updateUserPersonality: (userId, user) =>
      dispatch(updateUserPersonality(userId, user))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Result);
