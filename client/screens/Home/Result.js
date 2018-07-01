import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { personalityTypes } from '../../data';
import { updateUserPersonality } from '../../store/user';
import { styles } from '../../common/styles';

class Result extends React.Component {
  static navigationOptions = {
    title: 'Result'
  };

  componentDidMount() {
    this.props.user.personalityType = this.props.personality;
    const updatedUser = this.props.user;
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
                height: 300,
                width: 350,
                borderWidth: 1,
                borderColor: 'white'
              }}
              source={{ uri: personalityType.imageUrl }}
              resizeMode="stretch"
            />
            <Text style={[styles.smallerText, { fontSize: 28 }]}>
              {personalityType.name}
            </Text>
            <Text style={[styles.smallerText, { fontSize: 12 }]}>
              {personalityType.description}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#C2D3DA'
//   },
//   smallerText: {
//     alignSelf: 'center',
//     color: '#585A56',
//     textAlign: 'center',
//     alignItems: 'center',
//     fontWeight: 'bold',
//     padding: 20
//   }
// });

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
