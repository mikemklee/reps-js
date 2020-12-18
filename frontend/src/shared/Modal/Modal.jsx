import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { VscClose } from 'react-icons/vsc';

import './Modal.scss';

const modalElement = document.getElementById('modal-root');

const Modal = ({ children, defaultOpened = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(ref, () => ({ open, close }), [close]);

  const handleEscape = useCallback(
    (event) => {
      if (event.key === 'Escape') close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener('keydown', handleEscape, false);
    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className='modal'>
        <div className='modal-overlay' onClick={close} />
        <div className='modal-body'>
          <div className='modal-close' onClick={close}>
            <VscClose />
          </div>
          {children}
        </div>
      </div>
    ) : null,
    modalElement
  );
};

export default forwardRef(Modal);
