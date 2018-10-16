import { Dispatch } from 'redux';
import { Memo } from 'src/model/memo';
import { ActionType, createAction } from 'typesafe-actions';
import memoStorage from '../util/storage/memo';

enum ActionTypes {
  START_FETCH_MEMO_LIST = 'START_FETCH_MEMO_LIST',
  FINISH_FETCH_MEMO_LIST = 'FINISH_FETCH_MEMO_LIST',
  FAILURE_FETCH_MEMO_LIST = 'FAILURE_FETCH_MEMO_LIST',
  ADD_MEMO = 'ADD_MEMO'
}

const startFetchMemoList = createAction(ActionTypes.START_FETCH_MEMO_LIST, resolve => (
  () => resolve()
));

const finishFetchMemoList = createAction(ActionTypes.FINISH_FETCH_MEMO_LIST, resolve => (
  (memos: Memo[]) => resolve(memos)
));

const failureFetchMemoList = createAction(ActionTypes.FAILURE_FETCH_MEMO_LIST, resolve => (
  (reason: string) => resolve(reason)
));

export const addMemo = createAction(ActionTypes.ADD_MEMO, resolve => (
  (memo: Memo) => resolve(memo)
));

export const fetchMemoList = () => (async (dispatch: Dispatch) => {
  dispatch(startFetchMemoList());
  try {
    const memoList = await memoStorage.getAll();
    return dispatch(finishFetchMemoList(memoList));
  } catch (e) {
    return dispatch(failureFetchMemoList(e));
  }
});

interface StateType {
  memos: Memo[];
  isFetching: boolean;
  error: string | null;
}

type Actions =
  ActionType<
    typeof startFetchMemoList |
    typeof finishFetchMemoList |
    typeof failureFetchMemoList |
    typeof addMemo
  >;

const defaultState: StateType = {
  memos: [],
  isFetching: false,
  error: null
};

export default (state: StateType = defaultState, action: Actions) => {
  switch(action.type) {
    case ActionTypes.START_FETCH_MEMO_LIST:
      return {
        ...state,
        isFetching: true
      };

    case ActionTypes.FINISH_FETCH_MEMO_LIST:
      return {
        ...state,
        memos: [...action.payload],
        isFetching: false
      };

    case ActionTypes.FAILURE_FETCH_MEMO_LIST:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    case ActionTypes.ADD_MEMO:
      return {
        ...state,
        memos: [action.payload, ...state.memos]
      };

    default:
      return state;
  }
};
