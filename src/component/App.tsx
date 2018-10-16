import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import { RootState } from 'src/module';
import { userLoggedIn, userLoggedOut } from '../module/user';
import store, { history } from '../store';
import { auth } from '../util/firebase';
import Loader from './Loader';
import Login from './Login';
import Memo from './Memo';
import MemoEditor from './MemoEditor';
import MemoList from './MemoList';
import Top from './Top';

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

export class _App extends React.Component<PropTypes> {
  public render() {
    if (!this.props.isAppLoaded) {
      return <Loader />;
    }

    return (
      <ConnectedRouter history={history}>
        <Container>
          <Switch>
            <Route exact={true} path="/" component={Top} />
            <Route exact={true} path='/login' component={Login} />
            <Route exact={true} path='/memos' component={MemoList} />
            <Route exact={true} path='/memos/new' component={MemoEditor} />
            <Route exact={true} path='/memos/:id' component={Memo} />
            <Route exact={true} path='/memos/:id/edit' component={MemoEditor} />
          </Switch>
        </Container>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAppLoaded: state.user.isAuthReady
});

export default connect(mapStateToProps)(_App);

