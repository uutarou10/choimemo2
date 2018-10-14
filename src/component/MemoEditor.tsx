import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';
import { RootState } from 'src/module';
import { createMemo, editDraftBody, editDraftTitle } from 'src/module/memo';

interface PropTypes extends RouteComponentProps<{id?: string}> {
  draftTitle: string;
  draftBody: string;
  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => any;
  editDraftTitle: (event: React.ChangeEvent<HTMLInputElement>) => any;
  editDraftBody: (body: React.ChangeEvent<HTMLTextAreaElement>) => any;
}

export const _MemoEditor: React.SFC<PropTypes> = (props) => {
  const {
    draftBody,
    draftTitle
  } = props;

  const onSubmitHandler = () => {
    props.createMemo(
      'dummy-auhter-id',
      draftTitle,
      draftBody,
      true,
      []
    );
  };

  return (
    <div>
      <div>
        <Input
          onChange={props.editDraftTitle}
          value={draftTitle}
          placeholder='Title'
          fluid={true}
        />
      </div>
      <div>
        <Form>
          <TextArea
            onChange={props.editDraftBody}
            value={draftBody}
            placeholder='Body'
            fluid={true}
          />
        </Form>
      </div>
      <Button
        onClick={onSubmitHandler}
        primary={true}
      >作成</Button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  draftTitle: state.memo.draftTitle,
  draftBody: state.memo.draftBody
});

const mapDispatchToProps = (dispatch: any) => ({
  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => dispatch(createMemo(autherId, title, body, isPublic, attachments)),
  editDraftTitle: (event: React.ChangeEvent<HTMLInputElement>) => dispatch(editDraftTitle(event.target.value)),
  editDraftBody: (event: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(editDraftBody(event.target.value))
});

export default connect(mapStateToProps, mapDispatchToProps)(_MemoEditor);
