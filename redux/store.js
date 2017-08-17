import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import defaultStore from './defaultStore';

let logger;
switch (process.env.NODE_ENV) {
  case 'dev':
  case 'development':
  default:
    logger = require('redux-logger').logger;
    break;
}

const middlewares = [thunk];
logger && middlewares.unshift(logger);

const finalCreateStore = compose(applyMiddleware(...middlewares))(createStore);
const configureStore = (
  (initState = defaultStore) => finalCreateStore(reducer, initState)
);

export default configureStore();
