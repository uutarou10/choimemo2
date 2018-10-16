export interface StateType {
  appName: string;
}

const defaultState: StateType = {
  appName: 'Choimemo'
};

type Actions = null;

export default (state: StateType = defaultState, action: Actions) => {
  return state;
};
