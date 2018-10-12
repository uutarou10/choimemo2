import { ActionType, createAction } from 'typesafe-actions';

enum ActionTypes {
  APP_LOADED = 'APP_LOADED'
}

export const appLoaded = createAction(ActionTypes.APP_LOADED, resolve => (
  () => resolve()
));

export interface StateType {
  appName: string;
  isAppLoaded: boolean;
}

const defaultState: StateType = {
  appName: 'Choimemo',
  isAppLoaded: false
};

type Actions = ActionType<
  typeof appLoaded
>;

export default (state: StateType = defaultState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.APP_LOADED:
      return {
        ...state,
        isAppLoaded: true
      };
    default:
      return state;
  }
};
