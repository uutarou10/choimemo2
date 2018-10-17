import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Memo } from '../model/memo';
import Loader from './Loader';
import MemoEditor from './MemoEditor';

interface PropTypes extends RouteComponentProps<{id?: string}> {
  isFetching: boolean;
  memo: Memo;

  fetchMemo: (id: string) => any;
}

class _EditMemo extends React.Component<PropTypes> {
  public componentDidMount() {
    this.props.fetchMemo(this.props.match.params.id);
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
    //
  }
}
