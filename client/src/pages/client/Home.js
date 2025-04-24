import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './Home.css';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí harías una llamada a tu API para obtener propiedades destacadas
    // Por ahora usaremos datos de ejemplo
    const fetchFeaturedProperties = async () => {
      try {
        // Simular una llamada a la API
        setTimeout(() => {
          const exampleProperties = [
            {
              id: 1,
              title: 'Casa moderna en el centro',
              price: 250000,
              location: 'Centro Ciudad',
              bedrooms: 3,
              bathrooms: 2,
              area: 150,
              image: 'https://via.placeholder.com/300x200'
            },
            {
              id: 2,
              title: 'Apartamento con vista al mar',
              price: 180000,
              location: 'Zona Costera',
              bedrooms: 2,
              bathrooms: 1,
              area: 95,
              image: 'https://via.placeholder.com/300x200'
            },
            {
              id: 3,
              title: 'Casa de campo con jardín',
              price: 320000,
              location: 'Afueras',
              bedrooms: 4,
              bathrooms: 3,
              area: 250,
              image: 'https://via.placeholder.com/300x200'
            }
          ];
          
          setFeaturedProperties(exampleProperties);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      
      <header className="hero">
        <div className="hero-content">
          <h1>Encuentra la propiedad de tus sueños</h1>
          <p>Explora nuestra selección exclusiva de propiedades en venta y alquiler</p>
          <Link to="/properties" className="btn btn-primary">Ver propiedades</Link>
        </div>
      </header>
      
      <section className="featured-properties">
        <div className="container">
          <h2>Propiedades destacadas</h2>
          
          {loading ? (
            <div className="loading">Cargando propiedades...</div>
          ) : (
            <div className="property-grid">
              {featuredProperties.map(property => (
                <div key={property.id} className="property-card">
                  <div className="property-image">
                    <img src={property.image} alt={property.title} />
                  </div>
                  <div className="property-details">
                    <h3>{property.title}</h3>
                    <p className="property-price">${property.price.toLocaleString()}</p>
                    <p className="property-location">{property.location}</p>
                    <div className="property-features">
                      <span>{property.bedrooms} Habitaciones</span>
                      <span>{property.bathrooms} Baños</span>
                      <span>{property.area} m²</span>
                    </div>
                    <Link to={`/properties/${property.id}`} className="btn btn-secondary">Ver detalles</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="view-all">
            <Link to="/properties" className="btn btn-outline">Ver todas las propiedades</Link>
          </div>
        </div>
      </section>
      
      <section className="services">
        <div className="container">
          <h2>Nuestros servicios</h2>
          
          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Compra de propiedades</h3>
              <p>Encuentra la propiedad perfecta para ti con nuestra amplia selección de casas y apartamentos.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">📝</div>
              <h3>Venta de propiedades</h3>
              <p>Vende tu propiedad de manera rápida y segura con nuestros agentes expertos.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3>Asesoría inmobiliaria</h3>
              <p>Recibe asesoramiento profesional para todas tus necesidades inmobiliarias.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;