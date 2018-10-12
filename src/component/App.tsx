import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { userLoggedIn, userLoggedOut } from '../module/user';
import store, { history } from '../store';
import { auth } from '../util/firebase';
import Top from './Top';

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(userLoggedIn({email: user.email || 'No Email'}));
  } else {
    store.dispatch(userLoggedOut());
  }
});

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact={true} path="/" component={Top} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
