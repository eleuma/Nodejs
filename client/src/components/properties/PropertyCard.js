import React from 'react';
import '../../styles/PropertyCard.css';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={property.images && property.images.length > 0 ? property.images[0] : '/placeholder-house.jpg'} alt={property.title} />
      </div>
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="property-price">${property.price.toLocaleString()}</p>
        <div className="property-details">
          <span>{property.bedrooms} hab</span>
          <span>{property.bathrooms} baños</span>
          <span>{property.area} m²</span>
        </div>
        <p className="property-address">{property.address}</p>
        <p className="property-type">{property.type}</p>
      </div>
    </div>
  );
};

export default PropertyCard;