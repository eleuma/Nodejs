import React from 'react';
import '../../styles/PropertyFilter.css';

const PropertyFilter = ({ filters, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handleReset = () => {
    onFilterChange({
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
  };

  return (
    <div className="property-filter">
      <h2>Filtrar propiedades</h2>
      <form>
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="type">Tipo de propiedad</label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Todos</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="terreno">Terreno</option>
              <option value="oficina">Oficina</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="minPrice">Precio mínimo</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Precio mínimo"
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="maxPrice">Precio máximo</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Precio máximo"
            />
          </div>
        </div>
        
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="bedrooms">Habitaciones</label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
            >
              <option value="">Cualquiera</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="bathrooms">Baños</label>
            <select
              id="bathrooms"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
            >
              <option value="">Cualquiera</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          
          <div className="filter-actions">
            <button type="button" className="reset-button" onClick={handleReset}>
              Restablecer filtros
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertyFilter;