import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { personalityTypes } from '../../data';
import { updateUserPersonality } from '../../store/user';
import { setBudget } from '../../store/budget';
import { styles, colorTheme } from '../../common/styles';
import { determineBudget } from '../../common/index';
import { Button } from 'react-native-elements';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result',
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow }
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
        <ScrollView>
          {personalityType.name && (
            <View>
              <Image
                style={styles.personalityImg}
                source={{ uri: personalityType.imageUrl }}
                resizeMode="cover"
              />

              <View style={{ padding: 30 }}>
                <Text
                  style={[
                    styles.questionText,
                    { fontSize: 28, textAlign: 'center' }
                  ]}
                >
                  {personalityType.name}
                </Text>
                <Text
                  style={[styles.text, { fontSize: 12, position: 'relative' }]}
                >
                  {personalityType.description}
                </Text>
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
        </ScrollView>
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
