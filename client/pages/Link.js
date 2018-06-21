import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import PlaidAuthenticator from 'react-native-plaid-link'

export default class App extends React.Component {
  state = {
    data: {},
    status: 'LOGIN_BUTTON'
  }

  render() {
    console.log(this.state.status)

    switch (this.state.status) {
      case 'CONNECTED':
        console.log('connected')
        return this.renderDetails()
      case 'LOGIN_BUTTON':
      case 'EXIT':
        return this.renderButton()
      default:
        return this.renderLogin()
    }
  }

  renderButton = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({ status: '' })}>
          <Text style={styles.paragraph}>Login with Plaid</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onLoadStart = props => {
    console.log('onLoadStart', props)
  }

  onLoad = props => {
    console.log('onLoad', props)
  }

  onLoadEnd = props => {
    console.log('onLoadEnd', props)
  }

  componentDidUpdate(prevState) {
    console.log('**Component Did Update this.state.data:', this.state.data)
    console.log('***prevState.data', prevState.data)
    if (this.state.data === prevState.data) {
      // this URL will change
      this.fetch('https://localhost:8080/api/users/plaid', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_token: this.state.data.metadata.public_token
        })
      })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData)
        })
        .catch(error => {
          console.log('Error: ', error.message)
        })

      this.props.navigation.navigate('Quiz', {
        title: 'Quiz'
      })
    }

    // publicToken = 'public-sandbox-93e6261f-13b8-48b5-8b11-26360fb9fa8a'
  }

  renderLogin() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="bc8a1ae90c8899639cdfd58c69af10"
        env="sandbox"
        product="auth,transactions"
        onLoad={this.onLoad}
        onLoadStart={this.onLoadStart}
        onLoadEnd={this.onLoadEnd}
      />
    )
  }

  renderDetails() {
    console.log(
      'public token from renderDetails',
      this.state.data.metadata.public_token
    )

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Institution</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.name}
        </Text>
        <Text style={styles.paragraph}>Institution ID</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.institution.institution_id}
        </Text>
        <Text style={styles.paragraph}>Token</Text>
        <Text style={styles.value}>
          {this.state.data.metadata.public_token}
        </Text>
      </View>
    )
  }

  onMessage = data => {
    // console.log(data)
    /*
      Response example for success
      {
        "action": "plaid_link-undefined::connected",
        "metadata": {
          "account": {
            "id": null,
            "name": null
          },
          "account_id": null,
          "public_token": "public-sandbox-e697e666-9ac2-4538-b152-7e56a4e59365",
          "institution": {
            "name": "Chase",
            "institution_id": "ins_3"
          }
        }
      }
    */
    this.setState({
      data,
      status: data.action.substr(data.action.lastIndexOf(':') + 1).toUpperCase()
    })
    console.log('this.state onMessage handler', this.state)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  value: {
    marginBottom: 20,
    textAlign: 'center'
  }
})

// const mapState = state => {
//   return {
//     token: state.token
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     getAllPlaylists: () => dispatch(fetchPlaylists())
//   }
// }

// export default connect(
//   mapState,
//   mapDispatch
// )(SingleStory)
