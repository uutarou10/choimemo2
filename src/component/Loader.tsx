import * as React from 'react';
import { Dimmer, Loader as LoaderComponent } from 'semantic-ui-react';

const Loader = () => {
  return (
    <Dimmer active={true}>
      <LoaderComponent>Loading...</LoaderComponent>
    </Dimmer>
  );
};

export default Loader;
