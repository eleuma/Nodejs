import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProperties } from '../../services/api';
import PropertyCard from '../../components/properties/PropertyCard';
import PropertyFilter from '../../components/properties/PropertyFilter';
import '../../styles/PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await getProperties(filters);
        setProperties(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar propiedades:', error);
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="property-list-container">
      <h1>Propiedades disponibles</h1>
      
      <PropertyFilter filters={filters} onFilterChange={handleFilterChange} />
      
      {loading ? (
        <div className="loading">Cargando propiedades...</div>
      ) : properties.length > 0 ? (
        <div className="property-grid">
          {properties.map((property) => (
            <Link to={`/properties/${property._id}`} key={property._id}>
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="no-properties">
          No se encontraron propiedades con los filtros seleccionados.
        </div>
      )}
    </div>
  );
};

export default PropertyList;