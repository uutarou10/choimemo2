import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div>Hello world</div>
      </Provider>
    );
  }
}

export default App;
