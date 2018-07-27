import React from 'react';
import { connect } from 'react-redux';
import { SectionList, ScrollView, View, Text } from 'react-native';
import Transaction from './Transaction';
import { styles, colorTheme } from '../../common/styles';
import { sectionData } from '../../common/index';

function keyExtractor(item) {
  return item.id;
}

const renderSectionHeader = ({ section }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{section.title}</Text>
  </View>
);

const renderItem = ({ item }) => <Transaction transaction={item} />;

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
    return (
      <ScrollView style={styles.accountOverviewContainer}>
        <SectionList
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          sections={this.sections()}
        />
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
