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
            <div className="header-modal">
                <h2>Editar institución</h2>
                <button onClick={handleCloseModal}>x</button>
            </div>
            <InstitucionFormUpdate onClose={handleCloseModal} institucion={institucion}/>
        </div>
        </Modal>
    );
    };

    export default CrearInstitucionModalEdit;
