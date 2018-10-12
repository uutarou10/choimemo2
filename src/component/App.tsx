import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { appLoaded } from '../module/common';
import { userLoggedIn, userLoggedOut } from '../module/user';
import store, { history } from '../store';
import { auth } from '../util/firebase';
import MemoList from './MemoList';
import RenderBlocker from './RenderBlocker';
import Top from './Top';

auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(userLoggedIn({email: user.email || 'No Email'}));
  } else {
    store.dispatch(userLoggedOut());
  }

  store.dispatch(appLoaded());
});

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RenderBlocker>
            <Route exact={true} path="/" component={Top} />
            <Route path='/memos' component={MemoList} />
          </RenderBlocker>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
