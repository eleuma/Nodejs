import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserVisits } from '../../services/api';
import '../../styles/MyVisits.css';

const MyVisits = () => {
  const location = useLocation();
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(location.state?.success || false);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data = await getUserVisits();
        setVisits(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar visitas:', error);
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  // Limpiar el mensaje de éxito después de 5 segundos
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pendiente': return 'status-pending';
      case 'confirmada': return 'status-confirmed';
      case 'cancelada': return 'status-cancelled';
      case 'completada': return 'status-completed';
      default: return '';
    }
  };

  if (loading) {
    return <div className="loading">Cargando visitas...</div>;
  }

  return (
    <div className="my-visits-container">
      <h1>Mis visitas agendadas</h1>
      
      {success && (
        <div className="success-message">
          ¡Tu visita ha sido agendada exitosamente! Un agente se pondrá en contacto contigo para confirmar.
        </div>
      )}
      
      {visits.length > 0 ? (
        <div className="visits-list">
          {visits.map((visit) => (
            <div key={visit._id} className="visit-card">
              <div className="visit-header">
                <h3>{visit.property.title}</h3>
                <span className={`visit-status ${getStatusClass(visit.status)}`}>
                  {visit.status.charAt(0).toUpperCase() + visit.status.slice(1)}
                </span>
              </div>
              
              <div className="visit-details">
                <div className="property-image">
                  <img 
                    src={visit.property.images && visit.property.images.length > 0 
                      ? visit.property.images[0] 
                      : '/placeholder-house.jpg'} 
                    alt={visit.property.title} 
                  />
                </div>
                
                <div className="visit-info">
                  <p><strong>Dirección:</strong> {visit.property.address}</p>
                  <p><strong>Fecha y hora:</strong> {formatDate(visit.scheduledDate)}</p>
                  <p><strong>Agente asignado:</strong> {visit.agent ? `${visit.agent.name} ${visit.agent.lastName}` : 'Por asignar'}</p>
                  {visit.notes && <p><strong>Notas:</strong> {visit.notes}</p>}
                </div>
              </div>
              
              {visit.status === 'pendiente' && (
                <div className="visit-actions">
                  <button className="btn-cancel">Cancelar visita</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-visits">
          <p>No tienes visitas agendadas actualmente.</p>
          <p>Explora nuestras propiedades y agenda una visita para ver la que más te guste.</p>
        </div>
      )}
    </div>
  );
};

export default MyVisits;