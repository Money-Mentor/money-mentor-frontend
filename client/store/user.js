import axios from 'axios';
import { server } from './index';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER_PERSONALITY = 'UPDATE_USER_PERSONALITY';
const UPDATE_USER = 'UPDATE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const setPersonality = user => ({ type: UPDATE_USER_PERSONALITY, user });
const setInterval = user => ({ type: UPDATE_USER, user });

/**
 * THUNK CREATORS
 */


export const login = (email, password, navigation, pushToken) => dispatch =>
  axios
    .post(`${server}/auth/login`, { email, password, pushToken })
    .then(
      res => {
        dispatch(getUser(res.data));
        navigation.navigate('Main', { title: 'Main' });
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const signup = (email, password, pushToken) => dispatch => {
axios
  .post(`${server}/auth/signup`, { email, password, pushToken })
  .then(
    res => {
      dispatch(getUser(res.data));
    },
    authError => {
      // rare example: a good use case for parallel (non-catch) error handler
      dispatch(getUser({ error: authError }));
    }
  )
  .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));
};

// Change .then to using await
// Make it one function that accepts paramenter (signup v login)
// Rather than hard coding, in secrets.js, process.env = server location
// Set conflict object to have if process.env dev then localhost or production then heroku deployed

export const logout = () => dispatch =>
  axios
    .post(`${server}/api/auth/logout`)
    .then(_ => {
      dispatch(removeUser());
    })
    .catch(err => console.log(err));

export const updateUserPersonality = (userId, user) => {
  return async dispatch => {
    try {
      const res = await axios.put(`${server}/api/users/${userId}`, {
        user
      });
      dispatch(setPersonality(res.data));
    } catch (err) {
      console.log('Error updating user personality: ', err.message);
    }
  };
};

export const updateUserInterval = (user) => {
  return async dispatch => {
    try {
      const res = await axios.put(`${server}/api/users/${user.id}`, {
        user
      });
      dispatch(setInterval(res.data));
    } catch (err) {
      console.log('Error updating user reminderInterval: ', err.message);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER_PERSONALITY:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
