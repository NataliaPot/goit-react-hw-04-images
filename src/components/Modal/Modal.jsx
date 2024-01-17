import { useEffect } from 'react';
import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ closeModal, largeImageURL, tags }) => {
  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handlePressESC);

    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  });
  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <Overlay onClick={handleClickBackdrop}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;
