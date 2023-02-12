import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Componentes/Login';
import Dashboard from './Componentes/Dashboard';
import Clientes from './Componentes/Clientes';
import Usuarios from './Componentes/Usuarios';
import Articulos from './Componentes/Articulos';
import Cotizaciones from './Componentes/Cotizaciones';
import DashboardUsu from './Componentes/DashboardUsu';
import './App.css';

function App() {
  const [user, setUser] = useState({})

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login setUser={setUser} />} />
          <Route exact path="/homea" element={<Dashboard user={user} />} />
          <Route exact path="/homeu" element={<DashboardUsu />} />
          <Route exact path="/usuarios" element={<Usuarios />} />
          <Route exact path="/clientes" element={<Clientes />} />
          <Route exact path="/articulos" element={<Articulos />} />
          <Route exact path="/cotizaciones" element={<Cotizaciones />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
