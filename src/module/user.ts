import { ActionType, createAction } from 'typesafe-actions';
import User from '../model/user';

enum ActionTypes {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT'
}

// ユーザーがログインした際に呼ばれるAction
export const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN, resolve => (
  (user: User) => resolve(user)
));

// ユーザーがログアウトするか、初期処理で未ログインの際に呼ばれる
export const userLoggedOut = createAction(ActionTypes.USER_LOGGED_OUT, resolve => (
  () => resolve()
));

interface StateType {
  user?: User; // 未ログイン状態ならundefined
  isAuthReady: boolean; // onAuthStateChangedが一度でも呼ばれているか
}

const defaultState: StateType = {
  user: undefined,
  isAuthReady: false,
};

type Actions = ActionType<
  typeof userLoggedIn |
  typeof userLoggedOut
>;

export default (state: StateType = defaultState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGED_OUT:
      return {
        ...state,
        user: undefined,
        isAuthReady: true
      };

    case ActionTypes.USER_LOGGED_IN:
      return {
        ...state,
        user: action.payload,
        isAuthReady: true
      };

    default:
      return state;
  }
};
