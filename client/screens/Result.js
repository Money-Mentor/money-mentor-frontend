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
            <Text style={[styles.smallerText, { fontSize: 24 }]}>{personalityType.name}</Text>
            <Text style={[styles.smallerText, { fontSize: 12 }]}>{personalityType.description}</Text>
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
    alignItems: 'center',
    backgroundColor: '#C2D3DA',
  },
  smallerText: {
    alignSelf: 'center',
    color: '#585A56',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

const mapState = state => {
  return {
    personality: state.personality
  };
};

export default connect(mapState)(Result);
