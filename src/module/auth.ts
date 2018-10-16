import { Dispatch } from 'redux';
import { auth } from 'src/util/firebase';
import { ActionType, createAction } from 'typesafe-actions';

enum ActionTypes {
  EDIT_EMAIL = 'EDIT_EMAIL',
  EDIT_PASSWORD = 'EDIT_PASSWORD',
  START_LOGIN_PROCESSING = 'START_LOGIN_PROCESSING'
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

// ログイン処理を行うthunk
export const loginWithEmailAndPassword = (email: string, password: string) => (dispatch: Dispatch) =>{
  dispatch(startLoginProcessing());
  // tslint:disable-next-line
  auth.signInWithEmailAndPassword(email, password).catch(err => console.warn(err));
};

interface StateType {
  email: string;
  password: string;
  isLoginProcessing: boolean; // ログインログアウト処理中かどうか
}

const defaultState: StateType = {
  email: '',
  password: '',
  isLoginProcessing: false
};

type Actions = ActionType<
  typeof editEmail |
  typeof editPassword |
  typeof startLoginProcessing
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

    default:
      return state;
  }
};
