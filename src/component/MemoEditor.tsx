import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Checkbox, Form, Input, TextArea } from 'semantic-ui-react';
import { RootState } from 'src/module';
import { editDraftBody, editDraftTitle, toggleDraftPublic } from 'src/module/memo';

interface PropTypes {
  // from parent component
  buttonLabel: string;

  onSubmit: () => any;

  // from Redux state
  title: string;
  body: string;
  isPublic: boolean;

  editTitle: (e: React.ChangeEvent<HTMLInputElement>) => any;
  editBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => any;
  toggleIsPublic: () => any;
}

const _MemoEditor: React.SFC<PropTypes> = ({
  title,
  body,
  isPublic,
  buttonLabel,

  editTitle,
  editBody,
  toggleIsPublic,
  onSubmit
}) => {
  return (
    <div>
      <div>
        <Input
          onChange={editTitle}
          value={title}
          placeholder='Title'
          fluid={true}
        />
      </div>
      <div>
        <Form>
          <TextArea
            onChange={editBody}
            value={body}
            placeholder='Body'
            fluid='true'
          />
        </Form>
      </div>
      <Checkbox
        toggle={true}
        label='公開する'
        checked={isPublic}
        onClick={toggleIsPublic}
      />
      <Button
        onClick={onSubmit}
        primary={true}
        fluid={true}
      >{buttonLabel}</Button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  title: state.memo.draftTitle,
  body: state.memo.draftBody,
  isPublic: state.memo.draftIsPublic
});

const mapDispatchToPropr = (dispatch: Dispatch) => ({
  editTitle: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(editDraftTitle(e.target.value)),
  editBody: (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(editDraftBody(e.target.value)),
  toggleIsPublic: () => dispatch(toggleDraftPublic())
});

export default connect(mapStateToProps, mapDispatchToPropr)(_MemoEditor);
