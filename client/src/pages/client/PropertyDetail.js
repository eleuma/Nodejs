import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la propiedad:', error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleScheduleVisit = () => {
    if (!user) {
      navigate('/login', { state: { from: `/properties/${id}` } });
      return;
    }
    navigate(`/schedule-visit/${id}`);
  };

  if (loading) {
    return <div className="loading">Cargando propiedad...</div>;
  }

  if (!property) {
    return <div className="error">No se encontró la propiedad solicitada.</div>;
  }

  return (
    <div className="property-detail-container">
      <div className="property-images">
        <div className="main-image">
          <img 
            src={property.images && property.images.length > 0 
              ? property.images[mainImage] 
              : '/placeholder-house.jpg'} 
            alt={property.title} 
          />
        </div>
        
        {property.images && property.images.length > 1 && (
          <div className="thumbnail-images">
            {property.images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={mainImage === index ? 'active' : ''}
                onClick={() => setMainImage(index)}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="property-content">
        <h1>{property.title}</h1>
        <p className="property-price">${property.price.toLocaleString()}</p>
        <p className="property-address">{property.address}</p>
        
        <div className="property-features">
          <div className="feature">
            <span className="icon">🛏️</span>
            <span>{property.bedrooms} Habitaciones</span>
          </div>
          <div className="feature">
            <span className="icon">🚿</span>
            <span>{property.bathrooms} Baños</span>
          </div>
          <div className="feature">
            <span className="icon">📏</span>
            <span>{property.area} m²</span>
          </div>
          <div className="feature">
            <span className="icon">🏠</span>
            <span>{property.type}</span>
          </div>
        </div>
        
        <div className="property-description">
          <h2>Descripción</h2>
          <p>{property.description}</p>
        </div>
        
        {property.amenities && property.amenities.length > 0 && (
          <div className="property-amenities">
            <h2>Comodidades</h2>
            <ul>
              {property.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="property-actions">
          <button className="btn-primary" onClick={handleScheduleVisit}>
            Agendar visita
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;