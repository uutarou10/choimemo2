import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Menu } from 'semantic-ui-react';
import { logout as logoutAction } from 'src/module/auth';
import User from '../model/user';
import { RootState } from '../module';

interface PropTypes {
  user?: User;

  login: () => any;
  logout: () => any;
}

const _Header: React.SFC<PropTypes> = ({ user, login, logout }) => {
  return (
    <Menu size='small'>
      <Menu.Item name='Choimemo' />

      <Menu.Menu position='right'>
        <Menu.Item>
          {user ? (
            <Button
              onClick={logout}
            >Logout</Button>
          ) : (
            <Button
              primary={true}
              onClick={login}
            >Login</Button>
          )}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => ({
  login: () => dispatch(push('/login')),
  logout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(_Header);
