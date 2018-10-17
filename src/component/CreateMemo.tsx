import * as React from 'react';
import { connect } from 'react-redux';
import User from 'src/model/user';
import { RootState } from 'src/module';
import { createMemo as createMemoAction } from 'src/module/memo';
import MemoEditor from './MemoEditor';

interface PropTypes {
  user: User;
  title: string;
  body: string;
  isPublic: boolean;

  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => any;
}

const _CreateMemo: React.SFC<PropTypes> = ({
  user,
  title,
  body,
  isPublic,

  createMemo
}) => {
  const onSubmit = () => {
    createMemo(user.uid, title, body, isPublic, []);
  };

  return (
    <React.Fragment>
      <h2>Create new memo</h2>
      <MemoEditor
        buttonLabel='作成'
        onSubmit={onSubmit}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.user,
  title: state.memo.draftTitle,
  body: state.memo.draftBody,
  isPublic: state.memo.draftIsPublic
});

const mapDispatchToProps = (dispatch: any) => ({
  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => dispatch(createMemoAction(autherId, title, body, isPublic, attachments))
});

export default connect(mapStateToProps, mapDispatchToProps)(_CreateMemo);
