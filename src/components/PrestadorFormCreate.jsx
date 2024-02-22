import React, { useEffect, useState } from 'react';
import './FormsStyle.css'; 

const PrestadorFormCreate = (props) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [direccion, setDireccion] = useState('');
  const [zona, setZona] = useState('');
  const [especialidades, setEspecialidades] = useState([]);
  const [telefonos, setTelefonos] = useState([]);
  const [telefonoTemporalNumero, settelefonoTemporalNumero] = useState('');
  const [telefonoTemporalInterno, settelefonoTemporalInterno] = useState('');
  const [telefonoTemporalWhatsapp, settelefonoTemporalWhatsapp] = useState(false);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [mostrarCampos, setMostrarCampos] = useState(false); 
  const [horarios, setHorarios] = useState([]);
  const [dia, setDia] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL+'/especialidad/listar');
        if (!response.ok) {
          throw new Error('Error al obtener las especialidades');
        }
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!mostrarCampos) {
      setDireccion('');
      setZona('');
      setTelefonos([]);
      settelefonoTemporalNumero('');
      settelefonoTemporalInterno('');
      settelefonoTemporalWhatsapp('');
      setHorarios([]);
      setDia('');
      setInicio('');
      setFin('');
    }
  }, [mostrarCampos]);

  const manejarEnvio = async (event) => {
    event.preventDefault();
    try {

        if (!selectedEspecialidad || !nombre.trim() || !apellido.trim()) {
          alert('Por favor, ingrese un nombre y un apellido.');
          throw new Error('Los campos de especialidad, nombre y apellido son obligatorios.');
        }

        if (mostrarCampos && (!direccion.trim() || !zona.trim())) {
          alert('Por favor, ingrese una zona y una direccion correcta.');
          throw new Error('Los campos de dirección y zona son obligatorios.');
        }
        const response = await fetch(import.meta.env.VITE_API_URL+'/prestador/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, apellido, direccion, zona, especialidad: selectedEspecialidad, telefonos,horarios }),
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }

        if (response.ok) {
          alert('Prestador Creado!');
          props.onClose();
        }
  
        const data = await response.json();

        setNombre('');
        setApellido('');
        setDireccion('');
        setSelectedEspecialidad('');
        setZona('');
      } catch (error) {
        console.error('Error:', error.message);
      }
  };

  const agregarTelefono = () => {
    const telefono = {
      numero:telefonoTemporalNumero,
      whatapp:telefonoTemporalWhatsapp,
      interno:telefonoTemporalInterno
    }
    if (telefonoTemporalNumero) {
      setTelefonos([...telefonos, telefono]);
      settelefonoTemporalNumero('');
      settelefonoTemporalInterno('');
      settelefonoTemporalWhatsapp(false);
    }
  };

  const eliminarTelefono = (index) => {
    const nuevosTelefonos = [...telefonos];
    nuevosTelefonos.splice(index, 1);
    setTelefonos(nuevosTelefonos);
  };

  const manejarCambioTelefonoNumero = (e) => {
    settelefonoTemporalNumero(e.target.value);
  };

  const manejarCambioTelefonoInterno = (e) => {
    settelefonoTemporalInterno(e.target.value);
  };

  const manejarCambioTelefonoWhatsapp = (e) => {
    settelefonoTemporalWhatsapp(e.target.checked);
  };

  const agregarHorario = (event) => {  
    event.preventDefault();
    if (dia.trim() !== '' && inicio.trim() !== '' && fin.trim() !== '') {
        const nuevoHorario = {
          dia: dia,
          hora_inicio: inicio,
          hora_fin: fin,
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
    <form className="component-form" onSubmit={manejarEnvio}>

      <div>
        <h3 className='titulo'>Agregar Prestador</h3>
      </div>

      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Apellido:</label>
        <input
          type="text"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>


      <div className="form-group">
        <label>Especialidad:</label>
        <select
          value={selectedEspecialidad}
          onChange={(e) => setSelectedEspecialidad(e.target.value)}
        >
          <option value="">Seleccione una especialidad</option>
          {especialidades.map((especialidad) => (
            <option key={especialidad.id} value={especialidad.id}>
              {especialidad.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group independiente">
      <label>Independiente?</label>
        <input
          type="checkbox"
          className='checkbox'
          checked={mostrarCampos}
          onChange={() => setMostrarCampos(!mostrarCampos)}
        />
      </div>

      {mostrarCampos && (
        <>
          <div className="form-group">
            <label>Zona:</label>
            <input
              type="text"
              value={zona}
              onChange={(e) => setZona(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Telefono:</label>
            <div className="telephone-input">
              <input
                type="text"
                value={telefonoTemporalNumero}
                onChange={manejarCambioTelefonoNumero}
              />
              <label>Interno</label>
              <input
                type="text"
                value={telefonoTemporalInterno}
                onChange={manejarCambioTelefonoInterno}
              />
              <label>whatapp</label>
              <input
                type="checkbox"
                checked={telefonoTemporalWhatsapp}
                onChange={manejarCambioTelefonoWhatsapp}
              />
              <button className='small-button' type="button" onClick={agregarTelefono}>+</button>
            </div>
          </div>
          <div className="form-group">
            {telefonos.map((telefono, index) => (
              <div key={index} className="telephone-input">
                <input type="text" value={telefono.numero} placeholder="Teléfono" readOnly />
                <input type="text" value={telefono.interno} placeholder="Interno" readOnly />
                <input type="text" value={telefono.whatapp ? "SI" : "NO"} placeholder="Whatsapp" readOnly />

                <button className='small-button' type="button" onClick={() => eliminarTelefono(index)}>-</button>
              </div>
            ))}
        </div>

        <div>
          <div className='horario-label'>
          <label>Día:</label>
          <label>Inicio:</label>
          <label>Fin:</label>
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
    <button className='small-button' onClick={agregarHorario}>+</button>

    </div>
        <div>
          {horarios.map((horario, index) => (
            <div key={index} className="horario-inputs">
              <div>  
                <input type="text" value={horario.dia} readOnly />
              </div>
              <div>
                <input type="text" value={horario.hora_inicio} readOnly />
              </div>
              <div>
                <input type="text" value={horario.hora_fin} readOnly />
              </div>
              <button className='small-button' onClick={() => eliminarHorario(index)}>-</button>
            </div>
          ))}
        </div>
      </div>     
        
        </>
      )}


      <button type="submit" className='btn-w-100'>Cargar</button>
    </form>
  );
};

export default PrestadorFormCreate;
