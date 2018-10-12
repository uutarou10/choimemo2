import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../module';

interface PropTypes {
  appName: string;
}

const Top: React.SFC<PropTypes> = (props) => {
  const { appName } = props;
  return (
    <div>
      <h1>{appName}</h1>
      <p>いけいけメモアプリだと思って開発してたら、HackMdの存在を知ってしまった残念メモアプリ</p>
      <ul>
        <li><Link to='/memos'>Memos</Link></li>
        <li><Link to='/memos/new'>Create Memo</Link></li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  appName: state.common.appName
});

export default connect(mapStateToProps)(Top);
