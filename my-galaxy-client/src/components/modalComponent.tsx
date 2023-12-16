import React from 'react'
import '../styles/modal.css'

type ModalComponentProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalComponent: React.FC<ModalComponentProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        {children}
        <div className="modal-footer">
            <button className='close-btn' onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;