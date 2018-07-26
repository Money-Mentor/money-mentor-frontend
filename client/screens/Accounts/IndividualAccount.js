import React from 'react';
import { connect } from 'react-redux';
import { ListItem, List } from 'react-native-elements';
import { SectionList, ScrollView, View, Text } from 'react-native';
import Transaction from './Transaction';
import { styles, colorTheme } from '../../common/styles';
import { startDateString, sectionData } from '../../common/index';

function keyExtractor(item) {
  return item.title;
}

const renderSectionHeader = ({ section }) => (
  <View>
    <Text>{section.title}</Text>
  </View>
);

const renderItem = ({ item }) => <ListItem title={item.title} />;
class IndividualAccount extends React.Component {
  static navigationOptions = {
    title: 'Transactions',
    headerStyle: styles.headerStyle,
    headerTitleStyle: { color: colorTheme.white.snow },
  };

  sections() {
    const { transactions } = this.props;
    const accountId = this.props.navigation.getParam('accountId');
    const transactionArr =
      transactions &&
      transactions.filter(transaction => transaction.accountId === accountId);
    return sectionData(transactionArr);
  }

  render() {
    // const { transactions } = this.props;
    // let startDate = startDateString();
    // const accountId = this.props.navigation.getParam('accountId');
    return (
      <ScrollView style={styles.accountOverviewContainer}>
        <SectionList
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          sections={this.sections()}
        />
        {/* {
          <List>
            {transactions &&
              transactions
                .filter(
                  transaction =>
                    transaction.accountId === accountId &&
                    transaction.date >= startDate
                )
                .sort((a, b) => {
                  const sortedByDate = new Date(b.date) - new Date(a.date);

                  if (sortedByDate !== 0) {
                    return sortedByDate;
                  }

                  return b.id - a.id;
                })
                .map((transaction, key) => (
                  <Transaction key={key} transaction={transaction} />
                ))}
          </List>
        } */}
      </ScrollView>
    );
  }
}

const mapState = state => {
  return {
    transactions: state.acctTrans.trans,
  };
};

export default connect(mapState)(IndividualAccount);
