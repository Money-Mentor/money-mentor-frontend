import axios from 'axios'

// Action Types
const SET_ACCT_TRANS_DATA = 'SEND_ACCT_TRANS_DATA'

// Action Creators
const setAcctTransData = data => ({ type: SET_ACCT_TRANS_DATA, data })

export const fetchAcctTransData = () => {
  return async dispatch => {
    try {
      const res = await axios.get(
        'http://localhost:8080/api/accTrans',
      )
      dispatch(setAcctTransData(res.data))
    } catch (err) {
      console.log('Error fetching acct & trans data: ', err.message)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    
    case SET_ACCT_TRANS_DATA:
      return action.data

    default:
      return state
  }
}