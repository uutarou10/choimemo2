import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './module';

export const history = createBrowserHistory();

export default createStore(
  connectRouter(history)(rootReducer),
  applyMiddleware(
    routerMiddleware(history)
  )
);