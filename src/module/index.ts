import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import auth from './auth';
import common from './common';
import memo from './memo';
import memoList from './memoList';
import user from './user';

const rootReducer = combineReducers({
  common,
  memoList,
  user,
  memo,
  auth
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
