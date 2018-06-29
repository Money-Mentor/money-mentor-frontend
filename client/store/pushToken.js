import axios from 'axios';
import { server } from './index';

// Action Types
const SET_PUSH_TOKEN = 'SEND_PUSH_TOKEN';

// Action Creators
const setPushToken = pushToken => ({ type: SET_PUSH_TOKEN, pushToken });

export const sendPushToken = pushToken => {
  return async dispatch => {
    try {
      const res = await axios.put(`${server}/api/users/:id`, {
        push_token: pushToken
      });
      dispatch(setPushToken(res.data));
    } catch (err) {
      console.log('Error sending push token: ', err.message);
    }
  };
};

const initialToken = [];

export default (state = initialToken, action) => {
  switch (action.type) {

    case SET_PUSH_TOKEN:
      console.log('action set push token ==================', action.pushToken);
      return action.pushToken;

    default:
      return state;
  }
};
