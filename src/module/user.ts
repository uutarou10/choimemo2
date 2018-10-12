import { ActionType, createAction } from 'typesafe-actions';
import User from '../model/user';

enum ActionTypes {
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  USER_LOGGED_OUT = 'USER_LOGGED_OUT'
}

const userLoggedIn = createAction(ActionTypes.USER_LOGGED_IN, resolve => (
  (user: User) => resolve(user)
));

const userLoggedOut = createAction(ActionTypes.USER_LOGGED_OUT, resolve => (
  () => resolve()
));

type StateType = User | null;

type Actions = ActionType<
  typeof userLoggedIn |
  typeof userLoggedOut
>;

export default (state: StateType = null, action: Actions) => {
  switch (action.type) {
    case ActionTypes.USER_LOGGED_IN:
      return action.payload;

    case ActionTypes.USER_LOGGED_OUT:
      return null;

    default:
      return state;
  }
};
