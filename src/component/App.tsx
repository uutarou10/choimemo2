import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import { RootState } from 'src/module';
import { userLoggedIn, userLoggedOut } from '../module/user';
import store, { history } from '../store';
import { auth } from '../util/firebase';
import CreateMemo from './CreateMemo';
import EditMemo from './EditMemo';
import Header from './Header';
import Loader from './Loader';
import Login from './Login';
import Memo from './Memo';
import MemoList from './MemoList';
import Top from './Top';

// 認証の初期化処理(ハンドラーのセット)
auth.onAuthStateChanged(user => {
  if (user) {
    store.dispatch(userLoggedIn({
      uid: user.uid,
      email: user.email ? user.email : undefined
    }));
  } else {
    store.dispatch(userLoggedOut());
  }
});

interface PropTypes {
  isAppLoaded: boolean;
}

export const _App: React.SFC<PropTypes> = (props) => {
  if (!props.isAppLoaded) {
    return <Loader />;
  }

  return (
    <ConnectedRouter history={history}>
      <div>
        <Header />
        <Container>
          <Switch>
            <Route exact={true} path="/" component={Top} />
            <Route exact={true} path='/login' component={Login} />
            <Route exact={true} path='/memos' component={MemoList} />
            <Route exact={true} path='/memos/new' component={CreateMemo} />
            <Route exact={true} path='/memos/:id' component={Memo} />
            <Route exact={true} path='/memos/:id/edit' component={EditMemo} />
          </Switch>
        </Container>
      </div>
    </ConnectedRouter>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAppLoaded: state.user.isAuthReady
});

export default connect(mapStateToProps)(_App);

