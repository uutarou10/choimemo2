import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Button, Form } from 'semantic-ui-react';
import User from 'src/model/user';
import { RootState } from 'src/module';
import { editEmail, editPassword } from 'src/module/auth';
import { loginWithEmailAndPassword } from 'src/module/user';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

interface PropTypes {
  user?: User;
  isLoginProcessing: boolean;
  email: string;
  password: string;

  login: (email:string, password: string) => any;
  editEmailHandler: (event: ChangeEvent) => any;
  editPasswordHandler: (password: ChangeEvent) => any;
}

const _Login:React.SFC<PropTypes> = ({
  user,
  isLoginProcessing,
  login,
  email,
  password,
  editEmailHandler,
  editPasswordHandler
}) => {
  const onSubmitHandler = () => {
    login(email, password);
  };

  // ログイン済みの場合はmemosへリダイレクトする
  if (user) {
    return (
      <Redirect to='/memos' />
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <Form>
        <Form.Field>
          <label>Email</label>
          <input
            type='email'
            placeholder='mail@example.com'
            value={email}
            onChange={editEmailHandler}
            disabled={isLoginProcessing}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={editPasswordHandler}
            disabled={isLoginProcessing}
          />
        </Form.Field>
        <Button
          type='submit'
          onClick={onSubmitHandler}
          disabled={isLoginProcessing}
          loading={isLoginProcessing}
        >Login</Button>
      </Form>
    </div>
  );
};

const mapStateToProp = (state: RootState) => ({
  user: state.user.user,
  isLoginProcessing: state.user.isLoginProcessing,
  email: state.auth.email,
  password: state.auth.password
});

const mapDispatchToProps = (dispatch: any) => ({
  editEmailHandler: (event: ChangeEvent) => dispatch(editEmail(event.target.value)),
  editPasswordHandler: (event: ChangeEvent) => dispatch(editPassword(event.target.value)),
  login: (email: string, password: string) => dispatch(loginWithEmailAndPassword(email, password))
});

export default connect(mapStateToProp, mapDispatchToProps)(_Login);
