import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dimmer, Loader, Segment} from 'semantic-ui-react';
import { Memo } from 'src/model/memo';
import User from 'src/model/user';
import { RootState } from 'src/module';
import { fetchMemoList } from 'src/module/memoList';
import MemoListItem from'./MemoListItem';

interface PropTypes {
  memos: Memo[];
  isFetching: boolean;
  user?: User;

  fetchMemoList: () => any;
}

class _MemoList extends React.Component<PropTypes> {
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
      memos,
      user
    } = this.props;

    if (!user) {
      return <Redirect to='/' push={false} />;
    }

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
  isFetching: state.memoList.isFetching,
  user: state.user.user
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchMemoList: () => dispatch(fetchMemoList())
});

export default connect(mapStateToProps, mapDispatchToProps)(_MemoList);
