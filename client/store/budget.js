import axios from 'axios'
import { server } from './index';

// Action Types
const UPDATE_BUDGET = 'UPDATE_BUDGET'

// Action Creators
const updateBudget = data => ({ type: UPDATE_BUDGET, data })

export const setBudget = (budget) => {

  return async dispatch => {
    try {
      const res = await axios.put(
        `${server}/api/budget`, budget
      )
      dispatch(updateBudget(res.data))
    } catch (err) {
      console.log('Error fetching budget: ', err.message)
    }
  }
}

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_BUDGET:
      return action.data

    default:
      return state
  }
}
