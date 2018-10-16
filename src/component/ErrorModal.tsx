import * as React from 'react';
import { Button, Modal } from 'semantic-ui-react';

interface PropTypes {
  error?: Error;
  message?: string; // messageが渡された場合はそちらを優先して表示
  onClose: () => any;
}

const _ErrorModal: React.SFC<PropTypes> = ({ error, message, onClose }) => {
  if (!error) {
    return <React.Fragment />;
  }

  return (
    <Modal open={!!error}>
      <Modal.Header>Error!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>{message || error.message}</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>閉じる</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default _ErrorModal;
