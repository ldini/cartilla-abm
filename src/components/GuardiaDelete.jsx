import React, { useState, useEffect } from 'react';

const GuardiaDelete = () => {
  const [guardias, setGuardias] = useState([]);

  useEffect(() => {
    fetchGuardias();
  }, []);

  const fetchGuardias = async () => {
    try {
      const response = await fetch('http://localhost:3000/institucion/listar_guardia');
      if (!response.ok) {
        throw new Error('Error al obtener las guardias');
      }
      const data = await response.json();
      setGuardias(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteGuardia = async (guardia) => {
    if (!guardia) {
      alert('Por favor selecciona una guardia');
      return;
    }
    try {
        const body = JSON.stringify({
            especialidadId: guardia.especialidadId,
            institucionId: guardia.institucionId
          });
        const response = await fetch(`http://localhost:3000/institucion/delete_guardia`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:body
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la guardia');
        }
        alert('Guardia eliminada correctamente');
        fetchGuardias();
        setGuardiaSeleccionada(null); 
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div >
      <h3 className='titulo'>Guardias</h3>
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

export default GuardiaDelete;
