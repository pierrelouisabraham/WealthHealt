import React from 'react';
import Modal from 'pa-react-modal';
import { useState } from 'react'

const SuccessModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h1>My Modal Content</h1>
        <p>Vous pouvez cliquer sur la croix</p>
      </Modal>
    </div>
  );
};

export default SuccessModal;