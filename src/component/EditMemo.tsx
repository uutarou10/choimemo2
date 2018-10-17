import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import User from 'src/model/user';
import { RootState } from 'src/module';
import { fetchMemo, updateMemo } from 'src/module/memo';
import Loader from './Loader';
import MemoEditor from './MemoEditor';

interface PropTypes extends RouteComponentProps<{id?: string}> {
  isFetching: boolean;
  user: User;
  title: string;
  body: string;
  isPublic: boolean;

  fetchMemo: (id: string) => any;
  updateMemo: (
    id:string,
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => any;
}

class _EditMemo extends React.Component<PropTypes> {
  public componentDidMount() {
    this.props.fetchMemo(this.props.match.params.id as string);
  }

  public render() {
    const { isFetching } = this.props;

    return (
      <React.Fragment>
        <h2>Edit memo</h2>
        {isFetching ? (
          <Loader />
        ) : (
          <MemoEditor
            buttonLabel='更新'
            onSubmit={this.onSubmit}
          />
        )}
      </React.Fragment>
    );
  }

  private onSubmit = () => {
    // tslint:disable-next-line
    console.log('hoge')
    const {
      title,
      body,
      isPublic,
      user
    } = this.props;

    this.props.updateMemo(
      this.props.match.params.id as string,
      user.uid,
      title,
      body,
      isPublic,
      []
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isFetching: state.memo.isFetching,
  user: state.user.user,
  title: state.memo.draftTitle,
  body: state.memo.draftBody,
  isPublic: state.memo.draftIsPublic
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchMemo: (id: string) => dispatch(fetchMemo(id)),
  updateMemo: (
    id:string,
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) =>  dispatch(updateMemo(id, autherId, title, body, isPublic, attachments))
});

export default connect(mapStateToProps, mapDispatchToProps)(_EditMemo);
