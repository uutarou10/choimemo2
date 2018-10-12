import { combineReducers } from 'redux';
import common from './common';
import memoList from './memoList';
import user from './user';

export default combineReducers({
  common,
  memoList,
  user
});
