import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { styles, colorTheme } from '../../common/styles';
import IndividualAccount from './IndividualAccount';

class Accounts extends React.Component {
  static navigationOptions = {
    title: 'Accounts',
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow },
  };
  render() {
    const { account } = this.props;
    return (
      <View style={styles.accountOverviewContainer}>
        <List>
          {account &&
            account.map(account => (
              <ListItem
                key={account.id}
                title={account.name}
                rightTitle={`$ ${account.current_balance}`}
                onPress={() =>
                  this.props.navigation.navigate('IndividualAccount', {
                    title: 'IndividualAccount',
                    accountId: account.account_id,
                    accountName: account.name,
                  })
                }
                containerStyle={styles.transactionContainerStyle}
              />
            ))}
        </List>
      </View>
    );
  }
}

const mapState = state => {
  return {
    account: state.acctTrans.accounts,
    trans: state.acctTrans.trans,
  };
};

const AccountsConnect = connect(mapState)(Accounts);
export default AccountsConnect;

export const AccountStack = createStackNavigator({
  Accounts: { screen: AccountsConnect },
  IndividualAccount: { screen: IndividualAccount },
});
