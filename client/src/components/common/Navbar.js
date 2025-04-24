import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Comprobar si el usuario está logueado al cargar el componente
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">InmobiliariaApp</Link>
      </div>
      
      <ul className="navbar-links">
        <li>
          <Link to="/properties">Propiedades</Link>
        </li>
        
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        ) : (
          <>
            {userRole === 'client' && (
              <>
                <li>
                  <Link to="/client/dashboard">Mi Panel</Link>
                </li>
                <li>
                  <Link to="/client/visits">Mis Visitas</Link>
                </li>
                <li>
                  <Link to="/client/contracts">Mis Contratos</Link>
                </li>
              </>
            )}
            
            {userRole === 'agent' && (
              <>
                <li>
                  <Link to="/agent/dashboard">Panel de Agente</Link>
                </li>
                <li>
                  <Link to="/agent/properties">Gestionar Propiedades</Link>
                </li>
                <li>
                  <Link to="/agent/visits">Gestionar Visitas</Link>
                </li>
                <li>
                  <Link to="/agent/contracts">Gestionar Contratos</Link>
                </li>
              </>
            )}
            
            {userRole === 'admin' && (
              <>
                <li>
                  <Link to="/admin/dashboard">Panel de Admin</Link>
                </li>
                <li>
                  <Link to="/admin/users">Gestionar Usuarios</Link>
                </li>
                <li>
                  <Link to="/admin/properties">Gestionar Propiedades</Link>
                </li>
                <li>
                  <Link to="/admin/reports">Reportes</Link>
                </li>
              </>
            )}
            
            <li>
              <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;