import React, { useEffect, useState } from 'react';
import './FormsStyle.css'; 

const InstitucionFormUpdate = (props) => {
  const [nombre, setNombre] = useState(props.institucion.nombre);
  const [zona, setZona] = useState(props.institucion.zona);
  const [direccion, setDireccion] = useState(props.institucion.direccion);
  const [tipo, setTipo] = useState(props.institucion.tipo);
  const [telefonos, setTelefonos] = useState(props.institucion.telefonos);
  const [telefonoTemporalNumero, settelefonoTemporalNumero] = useState('');
  const [telefonoTemporalInterno, settelefonoTemporalInterno] = useState('');
  const [telefonoTemporalWhatsapp, settelefonoTemporalWhatsapp] = useState(false);


  const manejarEnvio = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`import.meta.env.VITE_API_URL/institucion/${props.institucion.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, zona, direccion, tipo, telefonos }),
        });
  
        if (!response.ok) {
          throw new Error('Error al enviar los datos');
        }

        if (response.ok) {
          alert('Institucion Modificada!');
          props.onClose();
        }

        const data = await response.json();
        console.log('Respuesta de la API:', data);
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

  return (
    <form className="component-form" onSubmit={manejarEnvio}>

      <div>
        <h3 className='titulo'>Modificar institucion</h3>
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
        <label>Zona:</label>
        <input
          type="text"
          value={zona}
          onChange={(e) => setZona(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Direccion:</label>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Tipo:</label>
        <input
          type="text"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
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
            type="checkbox" className='checkbox'
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


      <button type="submit" className='btn-w-100'>Editar</button>
    </form>
  );
};

export default InstitucionFormUpdate;
