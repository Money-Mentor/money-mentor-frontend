import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import token from './token';
import user from './user';
import personality from './personality';
import acctTrans from './acctTrans';
import budget from './budget';

const reducer = combineReducers({
  token,
  user,
  personality,
  acctTrans,
  budget
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './token';
export * from './user';
export * from './personality';
export * from './acctTrans';
export * from './budget';
