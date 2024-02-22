    import React, { useEffect, useState } from 'react';
    import Modal from 'react-modal';
    import PrestadorFormCreate from './PrestadorFormCreate';

    const PrestadorModalCreate = ({ isOpen, onClose }) => {
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
        contentLabel="Crear"
        ariaHideApp={false} 
        >
        <div>
            <div className="header-modal">
                <h2>Crear Prestador</h2>
                <button onClick={handleCloseModal}>x</button>
            </div>
            <PrestadorFormCreate onClose={handleCloseModal}/>
        </div>
        </Modal>
    );
    };

    export default PrestadorModalCreate;
