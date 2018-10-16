import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { Button, Checkbox, Form, Input, TextArea } from 'semantic-ui-react';
import User from 'src/model/user';
import { RootState } from 'src/module';
import { createMemo, editDraftBody, editDraftTitle, toggleDraftPublic, updateMemo } from 'src/module/memo';

interface PropTypes extends RouteComponentProps<{id?: string}> {
  draftTitle: string;
  draftBody: string;
  user?: User;
  isCreating: boolean;
  draftIsPublic: boolean;

  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => any;
  updateMemo: (
    id: string,
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => any;
  editDraftTitle: (event: React.ChangeEvent<HTMLInputElement>) => any;
  editDraftBody: (body: React.ChangeEvent<HTMLTextAreaElement>) => any;
  togglePublic: () => any;
}

class _MemoEditor extends React.Component<PropTypes> {
  public render() {
    const {
      draftBody,
      draftTitle,
      isCreating,
      draftIsPublic,
      togglePublic,
      user
    } = this.props;


    if (!user) {
      return <Redirect to='/' push={false} />;
    }

    const onSubmitHandler = () => {
      if (this.isEditMode()) {
        this.props.updateMemo(
          this.props.match.params.id as string,
          user.uid,
          draftTitle,
          draftBody,
          draftIsPublic,
          []
        );
      } else {
        this.props.createMemo(
          user.uid,
          draftTitle,
          draftBody,
          draftIsPublic,
          []
        );
      }
    };

    return (
      <div>
        <div>
          <Input
            onChange={this.props.editDraftTitle}
            value={draftTitle}
            placeholder='Title'
            fluid={true}
            disabled={isCreating}
          />
        </div>
        <div>
          <Form>
            <TextArea
              onChange={this.props.editDraftBody}
              value={draftBody}
              placeholder='Body'
              fluid='true'
              disabled={isCreating}
            />
          </Form>
        </div>
        <Checkbox
          toggle={true}
          label='公開する'
          checked={draftIsPublic}
          onClick={togglePublic}
        />
        <Button
          onClick={onSubmitHandler}
          primary={true}
          loading={isCreating}
          fluid={true}
        >{this.isEditMode() ? '更新' : '作成'}</Button>
      </div>
    );
  }

  private isEditMode = ():boolean => {
    return !!this.props.match.params.id;
  }
}

const mapStateToProps = (state: RootState) => ({
  draftTitle: state.memo.draftTitle,
  draftBody: state.memo.draftBody,
  isCreating: state.memo.isCreating,
  draftIsPublic: state.memo.draftIsPublic,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => ({
  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => dispatch(createMemo(autherId, title, body, isPublic, attachments)),
  updateMemo: (
    id: string,
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => dispatch(updateMemo(id, autherId, title, body, isPublic, attachments)),
  editDraftTitle: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(editDraftTitle(event.target.value)),
  editDraftBody: (event: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(editDraftBody(event.target.value)),
  togglePublic: () => dispatch(toggleDraftPublic())
});

export default connect(mapStateToProps, mapDispatchToProps)(_MemoEditor);
