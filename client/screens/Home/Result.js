import React from 'react';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { personalityTypes } from '../../data';
import { updateUserPersonality } from '../../store/user';
import { setBudget } from '../../store/budget';
import { styles } from '../../common/styles';
import { determineBudget } from '../../common/index';
import { Button } from 'react-native-elements';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result'
  };

  componentDidMount() {
    this.props.user.personalityType = this.props.personality;
    const updatedUser = this.props.user;
    this.props.updateUserPersonality(this.props.user.id, updatedUser);
  }

  render() {
    const personalityType =
      personalityTypes &&
      personalityTypes.find(
        personality => personality.name === this.props.personality
      );

    return (
      <View style={styles.container}>
        {personalityType.name && (
          <View>
            <View>
              <View>
                <Text>{personalityType.name}</Text>
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
                    resizeMode="cover"
                  />
                </View>

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

            <Button
              buttonStyle={styles.smallOrangeButton}
              textStyle={{ textAlign: 'center' }}
              title={`Set Budget By Personality`}
              onPress={() => {
                this.props.setBudget(
                  determineBudget(personalityType.name, this.props.budget)
                );
                this.props.navigation.navigate('EditCategories', {
                  title: 'EditCategories'
                });
              }}
            />
          </View>
        )}
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
