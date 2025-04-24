import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Aquí harías una llamada a tu API para autenticar al usuario
      // Por ahora simulamos una autenticación exitosa
      
      setTimeout(() => {
        // Simular diferentes roles para demostración
        let userRole;
        
        if (email.includes('admin')) {
          userRole = 'admin';
        } else if (email.includes('agent')) {
          userRole = 'agent';
        } else {
          userRole = 'client';
        }

        // Guardar token y rol en localStorage
        localStorage.setItem('token', 'fake-jwt-token');
        localStorage.setItem('userRole', userRole);
        
        // Redirigir según el rol
        switch (userRole) {
          case 'admin':
            navigate('/admin/dashboard');
            break;
          case 'agent':
            navigate('/agent/dashboard');
            break;
          default:
            navigate('/client/dashboard');
        }
        
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      
      <div className="auth-container">
        <div className="auth-form-container">
          <h2>Iniciar Sesión</h2>
          <p className="auth-subtitle">Accede a tu cuenta para gestionar tus propiedades</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Tu contraseña"
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
          
          <div className="auth-links">
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            <p>
              ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
          </div>
          
          <div className="auth-demo-info">
            <p><strong>Para demostración:</strong></p>
            <ul>
              <li>Cliente: cliente@ejemplo.com</li>
              <li>Agente: agent@ejemplo.com</li>
              <li>Admin: admin@ejemplo.com</li>
              <li>Contraseña: cualquiera</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;