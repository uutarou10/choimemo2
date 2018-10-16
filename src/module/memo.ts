import { replace } from 'connected-react-router';
import { Dispatch } from 'redux';
import { ActionType, createAction } from 'typesafe-actions';
import { Memo } from '../model/memo';
import memoStorage from '../util/storage/memo';

enum ActionTypes {
  START_FETCH_MEMO = 'START_FETCH_MEMO',
  FINISH_FETCH_MEMO = 'FINISH_FETCH_MEMO',
  FAILURE_FETCH_MEMO = 'FAILURE_FETCH_MEMO',
  START_CREATE_MEMO = 'START_CREATE_MEMO',
  FINISH_CREATE_MEMO = 'FINISH_CREATE_MEMO',
  FAILURE_CREATE_MEMO = 'FAILURE_CREATE_MEMO',

  EDIT_DRAFT_TITLE = 'EDIT_DRAFT_TITLE',
  EDIT_DRAFT_BODY = 'EDIT_DRAFT_BODY',
  TOGGLE_DRAFT_PUBLIC = 'TOGGLE_DRAFT_PUBLIC'
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

const startCreateMemo = createAction(ActionTypes.START_CREATE_MEMO, resolve => (
  () => resolve()
));

const finishCreateMemo = createAction(ActionTypes.FINISH_CREATE_MEMO, resolve => (
  (memo: Memo) => resolve(memo)
));

const failureCreateMemo = createAction(ActionTypes.FAILURE_CREATE_MEMO, resolve => (
  (error: string) => resolve(error)
));

export const editDraftTitle = createAction(ActionTypes.EDIT_DRAFT_TITLE, resolve => (
  (title: string) => resolve(title)
));

export const editDraftBody = createAction(ActionTypes.EDIT_DRAFT_BODY, resolve => (
  (body: string) => resolve(body)
));

export const toggleDraftPublic = createAction(ActionTypes.TOGGLE_DRAFT_PUBLIC, resolve => (
  () => resolve()
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

export const createMemo = (
  autherId: string,
  title: string,
  body: string,
  isPublic: boolean,
  attachments: string[]
) => (async (dispatch: Dispatch) => {
    dispatch(startCreateMemo());
    try {
      const memo = await memoStorage.create(
        autherId,
        title,
        body,
        isPublic,
        attachments
      );
      dispatch(finishCreateMemo(memo));
      dispatch(replace(`/memos/${memo.id}`));
      return;
  } catch (e) {
    return dispatch(failureCreateMemo(e));
  }
});

interface StateType {
  memo: Memo | null;
  isFetching: boolean;
  error: string | null;
  draftTitle: string;
  draftBody: string;
  isCreating: boolean;
  draftIsPublic: boolean;
}

const defaultState: StateType = {
  memo: null,
  isFetching: false,
  error: null,
  draftTitle: '',
  draftBody: '',
  isCreating: false,
  draftIsPublic: false
};

type Actions = ActionType<
  typeof startFetchMemo |
  typeof finishFetchMemo |
  typeof failureFetchMemo |
  typeof editDraftTitle |
  typeof editDraftBody |
  typeof startCreateMemo |
  typeof finishCreateMemo |
  typeof toggleDraftPublic
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

    case ActionTypes.EDIT_DRAFT_TITLE:
      return {
        ...state,
        draftTitle: action.payload
      };

    case ActionTypes.EDIT_DRAFT_BODY:
      return {
        ...state,
        draftBody: action.payload
      };

    case ActionTypes.START_CREATE_MEMO:
      return {
        ...state,
        isCreating: true
      };

    case ActionTypes.FINISH_CREATE_MEMO:
      return {
        ...state,
        isCreating: false,
        draftBody: '',
        draftIsPublic: false,
        draftTitle: ''
      };

    case ActionTypes.TOGGLE_DRAFT_PUBLIC:
      return {
        ...state,
        draftIsPublic: !state.draftIsPublic
      };

    default:
      return state;
  }
};
