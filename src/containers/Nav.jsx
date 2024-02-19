import React from 'react';
import "./Home.css"

const Nav = ({ cambiarFormulario }) => {
  return (
    <div className="nav">
      <button className="titulo" onClick={() => cambiarFormulario(6)}>Institucion</button>
      <button className="titulo" onClick={() => cambiarFormulario(7)}>Prestador</button>
      <button className="titulo" onClick={() => cambiarFormulario(3)}>Agregar Especialidad</button>
      <button className="titulo" onClick={() => cambiarFormulario(4)}>Agregar Guardia</button>
      <button className="titulo" onClick={() => cambiarFormulario(8)}>Eliminar Guardia</button>
      <button className="titulo" onClick={() => cambiarFormulario(5)}>Agregar Externo</button>
      <button className="titulo" onClick={() => cambiarFormulario(9)}>Eliminar Externo</button>
      <button className="titulo" onClick={() => cambiarFormulario(10)}>Asignar Institucion</button>

    </div>
  );
};

export default Nav;