import React, { useState, useEffect } from 'react';

const PrestadorInstitucionForm = (props) => {
  const [prestadores, setPrestadores] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [noInstituciones, setNoInstituciones] = useState([]);

  const [prestadorSeleccionado, setPrestadorSeleccionado] = useState('');
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [dia, setDia] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');

  useEffect(() => {
    const obtenerPrestadores = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL+'/prestador/listar');
      const data = await response.json();
      setPrestadores(data);
    };
    obtenerPrestadores();
  }, []);

//   useEffect(() => {
//     const obtenerInstituciones = async () => {
//       const response = await fetch(import.meta.env.VITE_API_URL+'/institucion/listar');
//       const data = await response.json();
//       setInstituciones(data);
//     };
//     obtenerInstituciones();
//   }, []);

  useEffect(() => {
    const filtrarNoInstituciones = async () => {
      if (prestadorSeleccionado !== '') {
        const response = await fetch(`import.meta.env.VITE_API_URL/institucion/listar/no/${prestadorSeleccionado}`);
        const data = await response.json();
        setNoInstituciones(data);
      }
    };
    filtrarNoInstituciones();
  }, [prestadorSeleccionado]);

  useEffect(() => {
    const filtrarInstituciones = async () => {
      if (prestadorSeleccionado !== '') {
        const response = await fetch(`import.meta.env.VITE_API_URL/institucion/listar/${prestadorSeleccionado}`);
        const data = await response.json();
        setInstituciones(data);
      }
    };
    filtrarInstituciones();
  }, [prestadorSeleccionado]);

  const handleAsignarClick = async () => {
    if (prestadorSeleccionado.trim() !== '' && institucionSeleccionada.trim() !== '') {
        try {
          const response = await fetch(import.meta.env.VITE_API_URL+'/prestador/asignar_institucion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              prestadorId: prestadorSeleccionado,
              institucionId: institucionSeleccionada,
              horarios: horarios,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Error al enviar los datos');
          }
    
          if (response.ok) {
            alert('Prestador Asignado');
            setInstitucionSeleccionada('');
            setPrestadorSeleccionado('');
            setHorarios([]);
          }
        } catch (error) {
          console.error('Error al asignar prestador:', error);
          alert('Error al asignar prestador');
        }
      } else {
        alert('Por favor selecciona un prestador e una institución');
      }
  };


    const handleHorarioChange = () => {
        if (dia.trim() !== '' && inicio.trim() !== '' && fin.trim() !== '') {
            const nuevoHorario = {
              dia: dia,
              inicio: inicio,
              fin: fin,
            };
            setHorarios([...horarios, nuevoHorario]);
            setDia('')
            setInicio('')
            setFin('')
        } else {
            alert('Por favor completa todos los campos');
        }
    };


  const eliminarHorario = (index) => {
    const nuevosHorarios = [...horarios];
    nuevosHorarios.splice(index, 1);
    setHorarios(nuevosHorarios);
  };

  return (
    <div>
      <h2 className='titulo'>Asignar Prestador a Institución</h2>
      <div className='component-form'>
      <div className='mb-10'>
        <label>Seleccionar Prestador:</label>
        <select
          value={prestadorSeleccionado}
          onChange={(e) => setPrestadorSeleccionado(e.target.value)}
        >
          <option value="">Seleccionar prestador...</option>
          {prestadores.map((prestador) => (
            <option key={prestador.id} value={prestador.id}>
              {prestador.nombre} {prestador.apellido}
            </option>
          ))}
        </select>
      </div>
      <div className='mb-10'>
        <label>Seleccionar Institución:</label>
        <select
          value={institucionSeleccionada}
          onChange={(e) => setInstitucionSeleccionada(e.target.value)}
        >
          <option value="">Seleccionar institución...</option>
          {noInstituciones.map((institucion) => (
            <option key={institucion.id} value={institucion.id}>
              {institucion.nombre}
            </option>
          ))}
        </select>
      </div>
      {/* Componente para seleccionar horarios */}
    <div>
    <div className='horario-label'>
        <label>Día:</label>
        <label>Hora de inicio:</label>
        <label>Hora de fin:</label>
    </div>
    <div className="horario-inputs">
    <div>
        <select className="" value={dia} onChange={(e) => setDia(e.target.value)}>
        <option value="">Seleccionar dia...</option>
        <option value="Lunes">Lunes</option>
        <option value="Martes">Martes</option>
        <option value="Miércoles">Miércoles</option>
        <option value="Jueves">Jueves</option>
        <option value="Viernes">Viernes</option>
        <option value="Sábado">Sábado</option>
        <option value="Domingo">Domingo</option>
        </select>
    </div>
    
    <div>
        <input className="small-input" type="text" value={inicio} onChange={(e) => setInicio(e.target.value)} />
    </div>


    <div>
        <input className="small-input" type="text" value={fin} onChange={(e) => setFin(e.target.value)} />
    </div>
    <button className="small-button" onClick={handleHorarioChange}>+</button>
    </div>

        
        <div>
          {horarios.map((horario, index) => (
            <div key={index} className="horario-inputs">
              <div>  
                <input type="text" value={horario.dia} readOnly />
              </div>
              <div>
                <input type="text" value={horario.inicio} readOnly />
              </div>
              <div>
                <input type="text" value={horario.fin} readOnly />
              </div>
              <button className='small-button' onClick={() => eliminarHorario(index)}>-</button>
            </div>
          ))}
        </div>
      </div>     
      <button className='btn-w-100' onClick={handleAsignarClick}>Asignar</button>

      {prestadorSeleccionado && instituciones.length > 0 && (
        <div>
            <h3>Instituciones Asignadas:</h3>
            <ul>
            {instituciones.map((institucion) => (
                <li key={institucion.id}>{institucion.nombre}</li>
            ))}
            </ul>
        </div>
        )}

        {prestadorSeleccionado && instituciones.length === 0 && (
        <p>No tiene instituciones asignadas</p>
        )}
      </div>
      

    </div>
  );
};

  

export default PrestadorInstitucionForm;
