import { Dispatch } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';
import { Memo } from '../model/memo';
import memoStorage from '../util/storage/memo';

enum ActionTypes {
  START_FETCH_MEMO = 'START_FETCH_MEMO',
  FINISH_FETCH_MEMO = 'FINISH_FETCH_MEMO',
  FAILURE_FETCH_MEMO = 'FAILURE_FETCH_MEMO'
}

const startFetchMemo = createAction(ActionTypes.START_FETCH_MEMO, resolve => (
  () => resolve()
));

const finishFetchMemo = createAction(ActionTypes.FINISH_FETCH_MEMO, resolve => (
  (memo: Memo) => resolve(memo)
));

const failureFetchMemo = createAction(ActionTypes.FAILURE_FETCH_MEMO, resolve => (
  (error: string) => resolve(error)
));

export const fetchMemo = (id: string) => (async (dispatch: Dispatch) => {
  dispatch(startFetchMemo());
  try {
    const memo = await memoStorage.get(id);
    return dispatch(finishFetchMemo(memo));
  } catch (e) {
    return dispatch(failureFetchMemo(e));
  }
});

interface StateType {
  memo: Memo | null;
  isFetching: boolean;
  error: string | null;
}

const defaultState: StateType = {
  memo: null,
  isFetching: false,
  error: null
};

type Actions = ActionType<
  typeof startFetchMemo |
  typeof finishFetchMemo |
  typeof failureFetchMemo
>;

export default (state: StateType = defaultState, action: Actions) => {
  switch(action.type) {
    case ActionTypes.START_FETCH_MEMO:
      return {
        ...state,
        isFetching: true
      };

    case ActionTypes.FINISH_FETCH_MEMO:
      return {
        ...state,
        memo: action.payload,
        isFetching: false
      };

    case ActionTypes.FAILURE_FETCH_MEMO:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    default:
      return state;
  }
};
