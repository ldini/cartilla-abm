    import React, { useEffect, useState } from 'react';
    import Modal from 'react-modal';
    import InstitucionForm from './InstitucionFormCreate'; 

    const CrearInstitucionModal = ({ isOpen, onClose }) => {
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
        contentLabel="Editar Institución"
        ariaHideApp={false} 
        >
        <div>
            <div className="header-modal">
                <h2>Crear Institución</h2>
                <button onClick={handleCloseModal}>x</button>
            </div>
            <InstitucionForm onClose={handleCloseModal}/>
        </div>
        </Modal>
    );
    };

    export default CrearInstitucionModal;
