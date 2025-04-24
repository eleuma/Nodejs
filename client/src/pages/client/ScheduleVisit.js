import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById, scheduleVisit } from '../../services/api';
import '../../styles/ScheduleVisit.css';

const ScheduleVisit = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(propertyId);
        setProperty(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la propiedad:', error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  // Obtener la fecha de mañana para establecer el mínimo en el input de fecha
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!visitDate || !visitTime) {
      setError('Por favor selecciona una fecha y hora para la visita.');
      return;
    }
    
    try {
      setSubmitting(true);
      const visitData = {
        propertyId,
        scheduledDate: `${visitDate}T${visitTime}:00`,
        notes
      };
      
      await scheduleVisit(visitData);
      navigate('/my-visits', { state: { success: true } });
    } catch (error) {
      console.error('Error al agendar visita:', error);
      setError('Ocurrió un error al agendar la visita. Por favor intenta de nuevo.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando propiedad...</div>;
  }

  if (!property) {
    return <div className="error">No se encontró la propiedad solicitada.</div>;
  }

  return (
    <div className="schedule-visit-container">
      <h1>Agendar visita</h1>
      
      <div className="property-summary">
        <img 
          src={property.images && property.images.length > 0 ? property.images[0] : '/placeholder-house.jpg'} 
          alt={property.title} 
        />
        <div className="property-info">
          <h2>{property.title}</h2>
          <p>{property.address}</p>
          <p className="price">${property.price.toLocaleString()}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="visit-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="visitDate">Fecha de visita:</label>
          <input
            type="date"
            id="visitDate"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            min={minDate}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="visitTime">Hora de visita:</label>
          <select
            id="visitTime"
            value={visitTime}
            onChange={(e) => setVisitTime(e.target.value)}
            required
          >
            <option value="">Selecciona una hora</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="12:00">12:00 PM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="notes">Notas adicionales (opcional):</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Escribe cualquier información adicional para el agente..."
            rows="4"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate(`/properties/${propertyId}`)}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={submitting}
          >
            {submitting ? 'Agendando...' : 'Agendar visita'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleVisit;