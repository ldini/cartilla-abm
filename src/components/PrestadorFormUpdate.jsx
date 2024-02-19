import React, { useEffect, useState } from 'react';
import './FormsStyle.css'; 

const PrestadorFormUpdate = (props) => {
  const [nombre, setNombre] = useState(props.prestador.nombre || '');
  const [apellido, setApellido] = useState(props.prestador.apellido || '');
  const [direccion, setDireccion] = useState(props.prestador.direccion || '');
  const [zona, setZona] = useState(props.prestador.zona || '');
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(props.prestador.especialidad.id ? props.prestador.especialidad.id : '');
  const [mostrarCampos, setMostrarCampos] = useState(false); 
  const [telefonos, setTelefonos] = useState(props.prestador.telefonos || '');
  const [telefonoTemporalNumero, settelefonoTemporalNumero] = useState('');
  const [telefonoTemporalInterno, settelefonoTemporalInterno] = useState('');
  const [telefonoTemporalWhatsapp, settelefonoTemporalWhatsapp] = useState(false);
  const [horarios, setHorarios] = useState(props.prestador.horarios || '');
  const [dia, setDia] = useState('');
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/especialidad/listar');
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
    if (props.prestador.zona) 
      setMostrarCampos(true);
    else
      setMostrarCampos(false);
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
    if (mostrarCampos) {
      setDireccion(props.prestador.direccion|| '');
      setZona(props.prestador.zona || '');
      setTelefonos(props.prestador.telefonos || []);
      settelefonoTemporalNumero('');
      settelefonoTemporalInterno('');
      settelefonoTemporalWhatsapp('');
      setHorarios(props.prestador.horarios || []);
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

      if (!selectedEspecialidad || !nombre || !apellido || !nombre.trim() || !apellido.trim()) {
        alert('Por favor, ingrese una zona y una direccion correcta.');
        throw new Error('Los campos de dirección y zona son obligatorios.');
      }
        const response = await fetch(`http://localhost:3000/prestador/${props.prestador.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, apellido, direccion, zona , especialidad:selectedEspecialidad,telefonos,horarios}),
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }
  
        if (response.ok) {
          alert('Datos modificados!');
          props.onClose();
        }
        const data = await response.json();

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
        <h3 className='titulo'>Editar</h3>
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


      <div className="form-group">
      <label>Independiente?</label>
        <input
          type="checkbox"
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
          <button type="button" onClick={agregarTelefono}>+</button>
        </div>
      </div>
    

      <div className="form-group">
      {telefonos.map((telefono, index) => (
          <div key={index} className="telephone-input">
            <input type="text" value={telefono.numero} placeholder="Teléfono" readOnly />
            <input type="text" value={telefono.interno} placeholder="Interno" readOnly />
            <input type="text" value={telefono.whatapp ? "SI" : "NO"} placeholder="Whatsapp" readOnly />

            <button type="button" onClick={() => eliminarTelefono(index)}>-</button>
          </div>
        ))}
      </div>

      <div>
      <div className="horario-inputs">
    <div> 
        <label>Día:</label>
        <select className="" value={dia} onChange={(e) => setDia(e.target.value)}>
        <option value="">Seleccionar día...</option>
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
      <label>inicio:</label>
      <input className="small-input" type="text" value={inicio} onChange={(e) => setInicio(e.target.value)} />
    </div>

    <div>
      <label>fin:</label>
      <input className="small-input" type="text" value={fin} onChange={(e) => setFin(e.target.value)} />
    </div>
    <button onClick={agregarHorario}>+</button>

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
              <button onClick={() => eliminarHorario(index)}>-</button>
            </div>
          ))}
        </div>
      </div>     


        </>
      )}



      <button onClick={manejarEnvio}>Editar</button>
    </form>
  );
};

export default PrestadorFormUpdate;