import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from 'src/module';
import { fetchMemo } from 'src/module/memo';
import { Memo as MemoModel } from '../model/memo';

interface PropTypes extends RouteComponentProps<{id: string}> {
  memo: MemoModel;
  isFetching: boolean;
  fetchMemo: (id: string) => any;
}

class Memo extends React.Component<PropTypes> {
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
    } = this.props;

    if (isFetching) {
      return <div/>;
    }

    if (memo) {
      return (
        <div>
          <h2>{memo.title}</h2>
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
  fetchMemo: (id: string) => dispatch(fetchMemo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Memo);
