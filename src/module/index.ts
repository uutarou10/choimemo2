import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import common from './common';
import memo from './memo';
import memoList from './memoList';
import user from './user';

const rootReducer = combineReducers({
  common,
  memoList,
  user,
  memo
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
