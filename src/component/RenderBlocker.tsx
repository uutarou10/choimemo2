import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/module';

interface PropTypes {
  isAppLoaded: boolean;
}

const RenderBlocker: React.SFC<PropTypes> = ({ isAppLoaded, children }) => {
  if (isAppLoaded) {
    return <React.Fragment>{children}</React.Fragment>;
  } else {
    return (
      <div>
        Loading...
      </div>
    );
  }
};

const mapStateToProps = (state: RootState) => ({
  isAppLoaded: state.common.isAppLoaded
});

export default connect(mapStateToProps)(RenderBlocker);
