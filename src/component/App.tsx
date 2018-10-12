import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import store, { history } from '../store';

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact={true} path='/'>
              <p>hoge</p>
            </Route>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
