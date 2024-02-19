import React, { useState, useEffect } from 'react';
import PrestadorModalCreate from './PrestadorModalCreate';
import PrestadorModalEdit from './PrestadorModalUpdate';


const PrestadorTable = () => {
  const [prestadores, setPrestadores] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [prestadorSeleccionado, setPrestadorSeleccionado] = useState(null);


  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModalEdit = (prestador) => {
    setModalEditIsOpen(true);
    setPrestadorSeleccionado(prestador);
  };

  const handleCloseModalEdit = () => {
    setModalEditIsOpen(false);
    setPrestadorSeleccionado(null);

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/prestador/listar');
        if (!response.ok) {
          throw new Error('Error al obtener las prestadores');
        }
        const data = await response.json();
        setPrestadores(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchData();
  }, [modalIsOpen, modalEditIsOpen]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/prestador/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar prestador');
      }
      const updatedPrestadores = prestadores.filter(inst => inst.id !== id);
      setPrestadores(updatedPrestadores);
      if (response.ok) {
        alert('Prestador eliminado.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
    <h3 className='titulo'>Eliminar o Editar Prestador</h3>

    <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className='create-button' onClick={handleOpenModal}>Crear Prestador</button>
        <PrestadorModalCreate isOpen={modalIsOpen} onClose={handleCloseModal} />
        {prestadorSeleccionado && (
          <PrestadorModalEdit
            isOpen={modalEditIsOpen}
            onClose={handleCloseModalEdit}
            prestador={prestadorSeleccionado}
          />
        )}
    </div>

    <table className="institucion-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Especialidad</th>
          <th>Zona</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
        {prestadores.map(prestador => (
          <tr key={prestador.id}>
            <td>{prestador.nombre}</td>
            <td>{prestador.apellido}</td>
            <td>{prestador.especialidad?.nombre}</td>
            <td>{prestador.zona}</td>
            <td>{prestador.direccion}</td>
            <td>
              <button className="edit-button" onClick={() => handleOpenModalEdit(prestador)}>Editar</button>
              <button className="delete-button" onClick={() => handleDelete(prestador.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default PrestadorTable;
