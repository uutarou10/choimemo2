import * as React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Segment } from 'semantic-ui-react';
import { Memo } from '../model/memo';

interface PropTypes {
  memo: Memo;
}

const MemoListItem: React.SFC<PropTypes> = ({ memo }) => {
  return (
    <Segment>
      <h3>
        <Link to={`/memos/${memo.id}`}>{memo.title}</Link>
      </h3>
      <Divider />
      <p>{memo.body}</p>
      <small>{memo.createdAt.toDateString()}<br />{memo.createdAt.toLocaleTimeString()}</small>
    </Segment>
  );
};


export default MemoListItem;
