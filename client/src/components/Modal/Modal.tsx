import React, { ReactNode, useEffect } from 'react';
import './Modal.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
