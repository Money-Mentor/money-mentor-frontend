import CalendarHeatmap from 'react-calendar-heatmap';
import { connect } from 'react-redux';
import React, { Component } from 'react';

class HeatMap extends Component {
  constructor() {
    super();
  }
  render() {
    const { transactions } = this.props;
    return (
      <CalendarHeatmap
        startDate={new Date('2016-01-01')}
        endDate={new Date('2016-04-01')}
        values={[
          { date: '2016-01-01' },
          { date: '2016-01-22' },
          { date: '2016-01-30' },
          // ...and so on
        ]}
      />
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    account: state.acctTrans.accounts,
    transactions: state.acctTrans.trans,
    budget: state.acctTrans.budget,
  };
};

export default connect(mapState)(HeatMap);
