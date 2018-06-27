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

//choose heroku or back-end
const processEnv = 'herokuR';

export const server =
  processEnv === 'back-end'
    ? 'http://localhost:8080'
    : 'http://money-mentor.herokuapp.com';

export default store;
export * from './token';
export * from './user';
export * from './personality';
export * from './acctTrans';
export * from './budget';
