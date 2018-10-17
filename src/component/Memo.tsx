import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button } from 'semantic-ui-react';
import { RootState } from 'src/module';
import { fetchMemo } from 'src/module/memo';
import { Memo as MemoModel } from '../model/memo';

interface PropTypes extends RouteComponentProps<{id: string}> {
  memo: MemoModel;
  isFetching: boolean;

  fetchMemo: (id: string) => any;
  redirectTo: (to: string) => any;
}

class _Memo extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchMemo(this.props.match.params.id);
  }

  public render() {
    const {
      memo,
      isFetching,
      redirectTo
    } = this.props;

    const redirectToEditor = () => {
      redirectTo(`/memos/${memo.id}/edit`);
    };

    if (isFetching) {
      return <div/>;
    }

    if (memo) {
      return (
        <div>
          <h2>{memo.title}</h2>
          <Button
            primary={true}
            onClick={redirectToEditor}
          >Edit</Button>
          <div>
            {memo.body}
          </div>
        </div>
      );
    } else {
      return <p>not found...</p>;
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  memo: state.memo.memo,
  isFetching: state.memo.isFetching
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchMemo: (id: string) => dispatch(fetchMemo(id)),
  redirectTo: (to: string) => dispatch(push(to))
});

export default connect(mapStateToProps, mapDispatchToProps)(_Memo);
