import { createPortal } from 'react-dom';

import { ModalWrapper, Overlay } from './Modal.styled';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeyDown);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeyDown);
  };

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClick = event => {
    if (event.target.nodeName === 'DIV') {
      this.props.closeModal();
    }
  };

  render() {
    const { image } = this.props;
    const { large, description } = image;

    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalWrapper>
          <img src={large} alt={description} />
        </ModalWrapper>
      </Overlay>,
      modalRoot
    );
  }
}
