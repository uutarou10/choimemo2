import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import { RootState } from 'src/module';
import { appLoaded } from '../module/common';
import { userLoggedIn, userLoggedOut } from '../module/user';
import store, { history } from '../store';
import { auth } from '../util/firebase';
import Loader from './Loader';
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
  isAppLoaded: state.common.isAppLoaded
});

export default connect(mapStateToProps)(_App);

