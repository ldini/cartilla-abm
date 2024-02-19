import React, { useState, useEffect } from 'react';
import './FormsStyle.css'; 

const GuardiaForm = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [seleccion, setSeleccion] = useState({ especialidadId: '', institucionId: '' });
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {

    const fetchInstituciones = async () => {
      try {
        const response = await fetch('http://localhost:3000/institucion/listar');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de instituciones');
        }
        const data = await response.json();
        const instituciones = data.map(({nombre,id}) => ({nombre,id}))
        setInstituciones(instituciones);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const fetchEspecialidades = async () => {
      try {
        const response = await fetch('http://localhost:3000/especialidad/listar');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de especialidades');
        }
        const data = await response.json();
        const especialidades = data.map(({nombre,id}) => ({nombre,id}))
        setEspecialidades(especialidades);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchInstituciones();
    fetchEspecialidades();
  }, []); 

  const handleInstitucionChange = (event) => {
    setSeleccion({ ...seleccion, institucionId: event.target.value });
  };

  const handleEspecialidadChange = (event) => {
    setSeleccion({ ...seleccion, especialidadId: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log(seleccion)
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/institucion/create_guardia', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(seleccion)
        });
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }
        console.log('Datos enviados correctamente');
        setSeleccion({ especialidadId: '', institucionId: '' });
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  return (
    <form className="component-form" onSubmit={handleSubmit}>
      <div>
        <h3 className='titulo'>Nueva Guardia</h3>
      </div>
      <div className="form-group">
        <label>Institucion</label>
        <select value={seleccion.institucionId} onChange={handleInstitucionChange}>
          <option value="">Selecciona institucion</option>
          {instituciones.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Especialidad:</label>
        <select value={seleccion.especialidadId} onChange={handleEspecialidadChange}>
          <option value="">Selecciona especialidad</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.nombre}
            </option>
          ))}
        </select>
      </div>
      <button className='form-group center' type="submit">Cargar</button>
    </form>
  );
};

export default GuardiaForm;
