import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER_PERSONALITY = 'UPDATE_USER_PERSONALITY';

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

/**
 * THUNK CREATORS
 */

export const login = (email, password) => dispatch =>
  axios
    .post(`http://localhost:8080/auth/login`, { email, password })
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

export const signup = (email, password) => dispatch =>
  axios
    .post(`http://localhost:8080/auth/signup`, { email, password })
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

export const logout = () => dispatch =>
  axios
    .post('http://localhost:8080/api/auth/logout')
    .then(_ => {
      dispatch(removeUser());
    })
    .catch(err => console.log(err));

export const updateUserPersonality = (userId, user) => {
  return async dispatch => {
    try {
      console.log('this should be updated user *****', user);
      const res = await axios.put(`http://localhost:8080/api/users/${userId}`, {
        user
      });
      console.log('what is my data here***', res.data);
      dispatch(setPersonality(res.data));
    } catch (err) {
      console.log('Error updating user personality: ', err.message);
    }
  };
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      console.log('action.user', action.user)
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_USER_PERSONALITY:
      return action.user;
    default:
      return state;
  }
}
