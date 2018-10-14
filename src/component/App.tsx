import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { appLoaded } from '../module/common';
import { userLoggedIn, userLoggedOut } from '../module/user';
import store, { history } from '../store';
import { auth } from '../util/firebase';
import Memo from './Memo';
import MemoEditor from './MemoEditor';
import MemoList from './MemoList';
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
          <Switch>
            <Route exact={true} path="/" component={Top} />
            <Route exact={true} path='/memos' component={MemoList} />
            <Route exact={true} path='/memos/new' component={MemoEditor} />
            <Route exact={true} path='/memos/:id' component={Memo} />
            <Route exact={true} path='/memos/:id/edit' component={MemoEditor} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;

