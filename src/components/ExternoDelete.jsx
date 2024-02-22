import React, { useState, useEffect } from 'react';

const ExternoDelete = () => {
  const [guardias, setGuardias] = useState([]);

  useEffect(() => {
    fetchGuardias();
  }, []);

  const fetchGuardias = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL+'/institucion/listar_externos');
      if (!response.ok) {
        throw new Error('Error al obtener externos');
      }
      const data = await response.json();
      setGuardias(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteGuardia = async (guardia) => {
    if (!guardia) {
      alert('Por favor selecciona un externo');
      return;
    }
    try {
        const body = JSON.stringify({
            especialidadId: guardia.especialidadId,
            institucionId: guardia.institucionId
          });
        const response = await fetch(`import.meta.env.VITE_API_URL/institucion/delete_externo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:body
        });
        if (!response.ok) {
            throw new Error('Error al eliminar externo');
        }
        alert('Externo eliminado correctamente');
        fetchGuardias();
        setGuardiaSeleccionada(null); 
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div >
      <h2 className='titulo'>Externos</h2>
      <table className="institucion-table">
        <thead>
          <tr>
            <th>Institución</th>
            <th>Especialidad</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guardias.map((guardia,index) => (
            <tr key={index}>
              <td>{guardia.nombre_institucion}</td>
              <td>{guardia.nombre_especialidad}</td>
              <td>
                <button className="delete-button" onClick={()=>handleDeleteGuardia(guardia)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExternoDelete;
