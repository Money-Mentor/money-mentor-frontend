import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { personalityTypes } from '../data';
import { updateUserPersonality } from '../store/user';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result'
  };

  componentDidMount() {
    this.props.user.personalityType = this.props.personality;
    const updatedUser = this.props.user;
    console.log('************ updatedUser here', updatedUser);

    this.props.dispatchedSetPersonality(this.props.user.id, updatedUser);
  }

  render() {
    const personalityType = personalityTypes.find(
      personality => personality.name === this.props.personality
    );

    return (
      <View style={styles.container}>
        {personalityType && (
          <View>
            <Image
              style={{
                alignSelf: 'center',
                height: 150,
                width: 150,
                borderWidth: 1,
                borderRadius: 75
              }}
              source={{ uri: personalityType.imageUrl }}
              resizeMode="stretch"
            />
            <Text>{personalityType.name}</Text>
            <Text>{personalityType.description}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapState = state => {
  return {
    user: state.user,
    personality: state.personality
  };
};

const mapDispatch = dispatch => {
  return {
    dispatchedSetPersonality: (userId, user) =>
      dispatch(updateUserPersonality(userId, user))
  };
};

export default connect(
  mapState,
  mapDispatch
)(Result);
