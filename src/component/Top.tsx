import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { Button, Icon } from 'semantic-ui-react';
import User from 'src/model/user';
import { RootState } from '../module';

interface PropTypes {
  appName: string;
  user?: User;
  toLogin: () => any;
}

const _Top: React.SFC<PropTypes> = (props) => {
  const {
    appName,
    user,
    toLogin
  } = props;

  if (user) {
    // ログイン済みであればメモ一覧に遷移
    return <Redirect to='/memos' push={false} />;
  }

  return (
    <div>
      <h1>
        <Icon name='pencil alternate' />{appName}
      </h1>
      <p>いけいけメモアプリだと思って開発してたら、HackMdの存在を知ってしまった残念メモアプリ</p>
      {process.env.NODE_ENV === 'development' ? (
        <ul>
          <li><Link to='/memos'>Memos</Link></li>
          <li><Link to='/memos/new'>Create Memo</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>
      ) : (undefined)}

      <Button
        primary={true}
        onClick={toLogin}
      >ログイン</Button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  appName: state.common.appName,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toLogin: () => dispatch(push('/login'))
});

export default connect(mapStateToProps, mapDispatchToProps)(_Top);
