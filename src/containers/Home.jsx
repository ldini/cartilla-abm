import React, { useState } from 'react';
import Nav from './Nav';
import PrestadorForm from '../components/PrestadorFormCreate'; 
import InstitucionForm from '../components/InstitucionFormCreate';
import EspecialidadForm from '../components/EspecialidadForm';
import GuardiaForm from '../components/GuardiaForm';
import ExternoForm from '../components/ExternoForm';
import InstitucionTable from '../components/InstitucionTable';
import PrestadorTable from '../components/PrestadorTable';
import GuardiaDelete from '../components/GuardiaDelete';
import ExternoDelete from '../components/ExternoDelete';
import PrestadorInstitucionForm from '../components/PrestadorInstitucionForm';

const Home = () => {
  const [formularioActual, setFormularioActual] = useState(6);

  const cambiarFormulario = (numeroFormulario) => {
    setFormularioActual(numeroFormulario);
  };

  return (
    <div className="home-container">

      <Nav cambiarFormulario={cambiarFormulario}></Nav>

      <div className="form-container">
        {formularioActual === 1 && <PrestadorForm />}
        {formularioActual === 2 && <InstitucionForm />}
        {formularioActual === 3 && <EspecialidadForm />}
        {formularioActual === 4 && <GuardiaForm />}
        {formularioActual === 5 && <ExternoForm />}
        {formularioActual === 6 && <InstitucionTable />}
        {formularioActual === 7 && <PrestadorTable />}
        {formularioActual === 8 && <GuardiaDelete />}
        {formularioActual === 9 && <ExternoDelete />}
        {formularioActual === 10 && <PrestadorInstitucionForm />}


      </div>
    </div>
  );
};

export default Home;
