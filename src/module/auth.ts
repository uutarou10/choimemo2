import { Dispatch } from 'redux';
import { auth } from 'src/util/firebase';
import { ActionType, createAction } from 'typesafe-actions';

enum ActionTypes {
  EDIT_EMAIL = 'EDIT_EMAIL',
  EDIT_PASSWORD = 'EDIT_PASSWORD',
  START_LOGIN_PROCESSING = 'START_LOGIN_PROCESSING',
  AUTH_ERROR = 'AUTH_ERROR',
  CLEAR_AUTH_ERROR = 'CLEAR_AUTH_ERROR'
}

export const editEmail = createAction(ActionTypes.EDIT_EMAIL, resolve => (
  (email: string) => resolve(email)
));

export const editPassword = createAction(ActionTypes.EDIT_PASSWORD, resolve => (
  (password: string) => resolve(password)
));

const startLoginProcessing = createAction(ActionTypes.START_LOGIN_PROCESSING, resolve => (
  () => resolve()
));

export const authError = createAction(ActionTypes.AUTH_ERROR, resolve => (
  (error: Error) => resolve(error)
));

export const clearAuthError = createAction(ActionTypes.CLEAR_AUTH_ERROR, resolve => (
  () => resolve()
));

// ログイン処理を行うthunk
export const loginWithEmailAndPassword = (email: string, password: string) => (dispatch: Dispatch) =>{
  dispatch(startLoginProcessing());
  auth.signInWithEmailAndPassword(email, password).catch(err => dispatch(authError(err)));
};

interface StateType {
  email: string;
  password: string;
  isLoginProcessing: boolean; // ログインログアウト処理中かどうか
  error?: Error;
}

const defaultState: StateType = {
  email: '',
  password: '',
  isLoginProcessing: false,
  error: undefined
};

type Actions = ActionType<
  typeof editEmail |
  typeof editPassword |
  typeof startLoginProcessing |
  typeof authError |
  typeof clearAuthError
>;

export default (state: StateType = defaultState, action: Actions) => {
  switch(action.type) {
    case ActionTypes.EDIT_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    case ActionTypes.EDIT_PASSWORD:
      return {
        ...state,
        password: action.payload
      };

    case ActionTypes.START_LOGIN_PROCESSING:
      return {
        ...state,
        isLoginProcessing: true
      };

    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoginProcessing: false
      };

    case ActionTypes.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: undefined
      };

    default:
      return state;
  }
};
