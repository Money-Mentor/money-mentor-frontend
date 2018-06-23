import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { personalityTypes } from '../data';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result'
  };

  render() {
    const personalityType = personalityTypes.find(
      personality => personality.name === this.props.personality
    );
    return (
      <View style={styles.container}>
        <Text>HELLLOOOOOOOOO</Text>
        {/* <Image
          style={{ width: 50, height: 50 }}
          // source={require('.../public/img/socialValueSpender.jpeg')}
        /> */}

        {/* <Image
          style={{
            alignSelf: 'center',
            height: 150,
            width: 150,
            borderWidth: 1,
            borderRadius: 75
          }}
          source={{
            uri:
              'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.prod.s3.amazonaws.com%2Ff826a4a8-d80a-11e6-944b-e7eb37a6aa8e?source=next&fit=scale-down&width=700'
          }}
          resizeMode="stretch"
        /> */}

        <Text>{personalityType.name}</Text>
        <Text>{personalityType.description}</Text>
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
    personality: state.personality
  };
};

export default connect(mapState)(Result);
