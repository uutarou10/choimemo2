enum ActionTypes {
  DUMMY = 'DUMMY'
}

export interface StateType {
  appName: string;
}

const defaultState: StateType = {
  appName: 'Choimemo'
};

export default (state: StateType = defaultState, action: ActionTypes) => {
  return state;
};
