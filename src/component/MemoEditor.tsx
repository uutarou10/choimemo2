import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { createMemo } from 'src/module/memo';

interface PropTypes extends RouteComponentProps<{id?: string}> {
  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => any;
}

interface StateTypes {
  title: string;
  body: string;
}

class MemoEditor extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  public componentDidMount() {
    if (this.props.match.params.id) {
      // メモの更新の場合
      
    } else {
      // 新規作成の場合
    }
  }

  public render() {
    return (
      <div>
        <div>
          <label>Title</label>
          <input
            type='text'
            name='title'
            onChange={this.onTitleChangeHandler}
          />
        </div>
        <div>
          <label>body</label>
          <textarea
            name='body'
            onChange={this.onBodyChangeHandler}
          />
        </div>
        <button
          onClick={this.onSubmitHandler}
        >作成</button>
      </div>
    );
  }

  private onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({
      title: value
    });
  }

  private onBodyChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    this.setState({
      body: value
    });
  }

  private onSubmitHandler = () => {
    this.props.createMemo(
      'dummy-auhter-id',
      this.state.title,
      this.state.body,
      true,
      []
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  createMemo: (
    autherId: string,
    title: string,
    body: string,
    isPublic: boolean,
    attachments: string[]
  ) => dispatch(createMemo(autherId, title, body, isPublic, attachments))
});

export default connect(null, mapDispatchToProps)(MemoEditor);
