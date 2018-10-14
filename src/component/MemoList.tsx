import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Memo } from 'src/model/memo';
import { RootState } from 'src/module';
import { fetchMemoList } from 'src/module/memoList';

interface PropTypes {
  memos: Memo[];
  isFetching: boolean;
  fetchMemoList: () => any;
}

class MemoList extends React.Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.memos.length === 0) {
      this.props.fetchMemoList();
    }
  }

  public render() {
    const {
      isFetching,
      memos
    } = this.props;

    return (
      <div>
        <h2>Your memos</h2>
        <div>
          {isFetching ? (undefined) : (
            memos.map(memo => (
              <li key={memo.id}>
                <Link to={`/memos/${memo.id}`}>{memo.title} / {memo.createdAt.toLocaleTimeString()}</Link>
              </li>
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  memos: state.memoList.memos,
  isFetching: state.memoList.isFetching
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchMemoList: () => dispatch(fetchMemoList())
});

export default connect(mapStateToProps, mapDispatchToProps)(MemoList);
