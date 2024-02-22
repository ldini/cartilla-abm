import React, { useState } from 'react';
import './FormsStyle.css'; 

const EspecialidadForm = () => {
  const [nombre, setNombre] = useState('');

  const manejarEnvio = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_API_URL+'/especialidad/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre}),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }
      const data = await response.json();
      console.log('Respuesta de la API:', data);
      setNombre('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form className="component-form" onSubmit={manejarEnvio}>
      <div>
        <h2 className='titulo'>Agregar Especialidad</h2>
      </div>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <button type="submit" className='btn-w-100'>Cargar</button>
    </form>
  );
};

export default EspecialidadForm;
