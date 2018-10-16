import { Dispatch } from 'redux';
import { auth } from 'src/util/firebase';
import { ActionType, createAction } from 'typesafe-actions';
import User from '../model/user';

enum ActionTypes {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
}

// ユーザーがログインした際に呼ばれるAction
export const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN, resolve => (
  (user: User) => resolve(user)
));

// ユーザーがログアウトするか、初期処理で未ログインの際に呼ばれる
export const userLoggedOut = createAction(ActionTypes.USER_LOGGED_OUT, resolve => (
  () => resolve()
));

// ログイン処理を行うthunk
export const loginWithEmailAndPassword = (email: string, password: string) => (dispatch: Dispatch) =>{
  auth.signInWithEmailAndPassword(email, password);
};

interface StateType {
  user?: User; // 未ログイン状態ならundefined
  isAuthReady: boolean; // onAuthStateChangedが一度でも呼ばれているか
  isLoginProcessing: boolean; // ログインログアウト処理中かどうか
}

const defaultState: StateType = {
  user: undefined,
  isAuthReady: false,
  isLoginProcessing: false
};

type Actions = ActionType<
  typeof userLoggedIn |
  typeof userLoggedOut
>;

export default (state: StateType = defaultState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGED_IN:
    case ActionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        isAuthReady: true
      };

    case ActionTypes.USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload
      };

    case ActionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        user: undefined
      };

    default:
      return state;
  }
};
