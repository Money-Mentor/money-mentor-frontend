import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchAcctTransData } from '../store'
import {
  StyleSheet,
  Text,
  View,
  Button
} from "react-native";

class Home extends React.Component {

  componentDidMount() {
    console.log("fetchAccTransData", this.props.fetchAcctTransData())
    this.props.fetchAcctTransData();
  }

  render() {
    const {account, trans} = this.props;
    console.log("these are my props", this.props)
    return (
        <View style={styles.container}>
      <View style={styles.circle}>
        <View style={[styles.circleFill, { height:'50%' }]}/>    {/*update for actual value*/}
        <Text style={styles.text}>$1,000</Text>
      </View>
      <Button
        raised
        buttonStyle={{ backgroundColor: '#118C8B', borderRadius: 10 }}
        textStyle={{ textAlign: 'center' }}
        title={`Go To Account Overview`}
        onPress={() => {
          this.props.navigation.navigate('AccountsOverview', { title: 'AccountsOverview' });
        }
        }
      />
    </View>)
  }
}


const mapState = state => {
  return {
   account: state.acctTrans.accounts,
   trans: state.acctTrans.trans,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAcctTransData: () => dispatch(fetchAcctTransData()),
  }
}

export default connect(mapState, mapDispatch)(Home);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C2D3DA'
  },
  circle: {
    width: 196,
    height: 196,
    borderRadius: 196 / 2,
    borderWidth: 3,
    borderColor: '#F1F3F2',
    overflow: 'hidden',
    backgroundColor: '#F2746B',
  },
  circleFill: {
    backgroundColor: '#F14D49',
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
  text: {
    fontSize:18,
    alignSelf:'center',
    color:'#F1F3F2',
    height:100,
    lineHeight:150,
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: 'bold'
  }
});
