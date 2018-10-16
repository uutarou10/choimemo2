import { ActionType, createAction } from 'typesafe-actions';

enum ActionTypes {
  EDIT_EMAIL = 'EDIT_EMAIL',
  EDIT_PASSWORD = 'EDIT_PASSWORD'
}

export const editEmail = createAction(ActionTypes.EDIT_EMAIL, resolve => (
  (email: string) => resolve(email)
));

export const editPassword = createAction(ActionTypes.EDIT_PASSWORD, resolve => (
  (password: string) => resolve(password)
));

interface StateType {
  email: string;
  password: string;
}

const defaultState: StateType = {
  email: '',
  password: ''
};

type Actions = ActionType<
  typeof editEmail |
  typeof editPassword
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

    default:
      return state;
  }
};
