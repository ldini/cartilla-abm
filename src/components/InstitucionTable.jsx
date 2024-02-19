import React, { useState, useEffect } from 'react';
import CrearInstitucionModal from './InstitucionModalCreate';
import CrearInstitucionModalEdit from './InstitucionModalUpdate';

const InstitucionTable = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState(null);


  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModalEdit = (institucion) => {
    setModalEditIsOpen(true);
    setInstitucionSeleccionada(institucion);
  };

  const handleCloseModalEdit = () => {
    setModalEditIsOpen(false);
    setInstitucionSeleccionada(null);

  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/institucion/listar');
        if (!response.ok) {
          throw new Error('Error al obtener las instituciones');
        }
        const data = await response.json();
        setInstituciones(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchData();
  }, [modalIsOpen, modalEditIsOpen]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/institucion/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la institución');
      }

      const updatedInstituciones = instituciones.filter(inst => inst.id !== id);
      setInstituciones(updatedInstituciones);

      if (response.ok) {
        alert('Institucion eliminada.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>

    <h3 className='titulo'>Institucion</h3>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className='create-button' onClick={handleOpenModal}>Crear Institucion</button>
        <CrearInstitucionModal isOpen={modalIsOpen} onClose={handleCloseModal} />
        {institucionSeleccionada && (
          <CrearInstitucionModalEdit
            isOpen={modalEditIsOpen}
            onClose={handleCloseModalEdit}
            institucion={institucionSeleccionada}
          />
        )}
    </div>
    <table className="institucion-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Zona</th>
          <th>Dirección</th>
          <th>Tipo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {instituciones.map(institucion => (
          <tr key={institucion.id}>
            <td>{institucion.nombre}</td>
            <td>{institucion.zona}</td>
            <td>{institucion.direccion}</td>
            <td>{institucion.tipo}</td>
            <td>
              <button className="edit-button" onClick={() => handleOpenModalEdit(institucion)}>Editar</button>
              <button className="delete-button" onClick={() => handleDelete(institucion.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default InstitucionTable;
