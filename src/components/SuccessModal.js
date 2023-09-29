import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Success Modal"
    >
      <h2>Enregistrement réussi</h2>
      <p>Votre employé a été enregistré avec succès.</p>
      <button onClick={onRequestClose}>Fermer</button>
    </Modal>
  );
};

export default SuccessModal;