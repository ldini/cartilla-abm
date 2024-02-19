    import React, { useEffect, useState } from 'react';
    import Modal from 'react-modal';
    import PrestadorFormUpdate from './PrestadorFormUpdate';

    const PrestadorModalEdit = ({ isOpen, onClose, prestador }) => {
    const [modalIsOpen, setModalIsOpen] = useState(isOpen);

    useEffect(() => {
        setModalIsOpen(isOpen); 
      }, [isOpen]);

    

    const handleCloseModal = () => {
        setModalIsOpen(false);
        onClose();
    };

    return (
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Editar"
        ariaHideApp={false} 
        >
        <div>
            <h2>Editar</h2>
            <button onClick={handleCloseModal}>x</button>
            <PrestadorFormUpdate onClose={handleCloseModal} prestador={prestador}/>
        </div>
        </Modal>
    );
    };

    export default PrestadorModalEdit;
