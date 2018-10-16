import * as React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Segment} from 'semantic-ui-react';
import { Memo } from 'src/model/memo';
import { RootState } from 'src/module';
import { fetchMemoList } from 'src/module/memoList';
import MemoListItem from'./MemoListItem';

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
          {isFetching ? (
            <Segment vertical={true}>
              <Dimmer active={true} inverted={true}>
                <Loader inverted={true}>Loading</Loader>
              </Dimmer>
            </Segment>
          ) : (
            memos.map(memo => <MemoListItem key={memo.id} memo={memo} />)
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
