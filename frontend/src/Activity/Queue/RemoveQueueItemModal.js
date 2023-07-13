import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FormGroup from 'Components/Form/FormGroup';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormLabel from 'Components/Form/FormLabel';
import Button from 'Components/Link/Button';
import Modal from 'Components/Modal/Modal';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { inputTypes, kinds, sizes } from 'Helpers/Props';
import translate from 'Utilities/String/translate';

class RemoveQueueItemModal extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      removeFromClient: true,
      blocklist: false,
      skipRedownload: false
    };
  }

  //
  // Control

  resetState = function() {
    this.setState({
      removeFromClient: true,
      blocklist: false,
      skipRedownload: false
    });
  };

  //
  // Listeners

  onRemoveFromClientChange = ({ value }) => {
    this.setState({ removeFromClient: value });
  };

  onBlocklistChange = ({ value }) => {
    this.setState({ blocklist: value });
  };

  onSkipRedownloadChange = ({ value }) => {
    this.setState({ skipRedownload: value });
  };

  onRemoveConfirmed = () => {
    const state = this.state;

    this.resetState();
    this.props.onRemovePress(state);
  };

  onModalClose = () => {
    this.resetState();
    this.props.onModalClose();
  };

  //
  // Render

  render() {
    const {
      isOpen,
      sourceTitle,
      canIgnore
    } = this.props;

    const { removeFromClient, blocklist, skipRedownload } = this.state;

    return (
      <Modal
        isOpen={isOpen}
        size={sizes.MEDIUM}
        onModalClose={this.onModalClose}
      >
        <ModalContent
          onModalClose={this.onModalClose}
        >
          <ModalHeader>
            Remove - {sourceTitle}
          </ModalHeader>

          <ModalBody>
            <div>
              Are you sure you want to remove '{sourceTitle}' from the queue?
            </div>

            <FormGroup>
              <FormLabel>
                {translate('RemoveFromDownloadClient')}
              </FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="removeFromClient"
                value={removeFromClient}
                helpTextWarning={translate('RemoveFromDownloadClientHelpTextWarning')}
                isDisabled={!canIgnore}
                onChange={this.onRemoveFromClientChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>
                {translate('BlocklistRelease')}
              </FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="blocklist"
                value={blocklist}
                helpText={translate('BlocklistReleaseHelpText')}
                onChange={this.onBlocklistChange}
              />
            </FormGroup>

            {
              blocklist &&
                <FormGroup>
                  <FormLabel>
                    {translate('SkipRedownload')}
                  </FormLabel>
                  <FormInputGroup
                    type={inputTypes.CHECK}
                    name="skipRedownload"
                    value={skipRedownload}
                    helpText={translate('SkipRedownloadHelpText')}
                    onChange={this.onSkipRedownloadChange}
                  />
                </FormGroup>
            }

          </ModalBody>

          <ModalFooter>
            <Button onPress={this.onModalClose}>
              Close
            </Button>

            <Button
              kind={kinds.DANGER}
              onPress={this.onRemoveConfirmed}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}

RemoveQueueItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  sourceTitle: PropTypes.string.isRequired,
  canIgnore: PropTypes.bool.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default RemoveQueueItemModal;
