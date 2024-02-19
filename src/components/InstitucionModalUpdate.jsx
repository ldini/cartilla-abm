    import React, { useEffect, useState } from 'react';
    import Modal from 'react-modal';
    import InstitucionFormUpdate from './InstitucionFormUpdate';

    const CrearInstitucionModalEdit = ({ isOpen, onClose , institucion}) => {
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
            <h2>Crear Institución</h2>
            <button onClick={handleCloseModal}>x</button>
            <InstitucionFormUpdate onClose={handleCloseModal} institucion={institucion}/>
        </div>
        </Modal>
    );
    };

    export default CrearInstitucionModalEdit;
