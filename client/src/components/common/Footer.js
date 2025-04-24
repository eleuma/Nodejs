import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>InmobiliariaApp</h3>
          <p>Tu plataforma inmobiliaria de confianza para encontrar la propiedad de tus sueños.</p>
        </div>
        
        <div className="footer-section">
          <h3>Enlaces rápidos</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/properties">Propiedades</a></li>
            <li><a href="/about">Sobre nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: info@inmobiliariaapp.com</p>
          <p>Teléfono: +123 456 7890</p>
          <p>Dirección: Calle Principal 123, Ciudad</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} InmobiliariaApp. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;