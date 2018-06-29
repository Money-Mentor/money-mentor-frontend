import axios from 'axios';
import { server } from './index';

// Action Types
const SET_ACCT_TRANS_DATA = 'SEND_ACCT_TRANS_DATA';
const CHANGE_TRANS = 'CHANGE_TRANS'

// Action Creators
const setAcctTransData = data => ({ type: SET_ACCT_TRANS_DATA, data });
const changeTrans = data => ({ type: CHANGE_TRANS, data });

export const fetchAcctTransData = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`${server}/api/accTrans`);
      dispatch(setAcctTransData(res.data));
    } catch (err) {
      console.log('Error fetching acct & trans data: ', err.message);
    }
  };
};

export const updateTrans = newTrans => {
  return async dispatch => {
    try {
      const res = await axios.put(`${server}/api/accTrans/${id}`, newTrans);
      dispatch(changeTrans(res.data));
    } catch (err) {
      console.log('Error updating transaction: ', err.message);
    }
  };
};


const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCT_TRANS_DATA:
      return action.data;

    default:
      return state;
  }
};
