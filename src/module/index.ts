import { combineReducers } from 'redux';
import common from './common';
import memoList from './memoList';

export default combineReducers({
  common,
  memoList
});
