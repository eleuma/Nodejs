import axios from 'axios';

// Crear una instancia de axios con configuración base
const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Asumiendo que tu backend corre en este puerto
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirigir al login si hay un error de autenticación
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de autenticación
const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
};

// Servicios para propiedades
const propertyService = {
  getAllProperties: async () => {
    const response = await api.get('/properties');
    return response.data;
  },
  getPropertyById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },
  createProperty: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },
  updateProperty: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }
};

// Servicios para visitas
const visitService = {
  getAllVisits: async () => {
    const response = await api.get('/visits');
    return response.data;
  },
  getVisitById: async (id) => {
    const response = await api.get(`/visits/${id}`);
    return response.data;
  },
  createVisit: async (visitData) => {
    const response = await api.post('/visits', visitData);
    return response.data;
  },
  updateVisit: async (id, visitData) => {
    const response = await api.put(`/visits/${id}`, visitData);
    return response.data;
  },
  deleteVisit: async (id) => {
    const response = await api.delete(`/visits/${id}`);
    return response.data;
  }
};

// Servicios para contratos
const contractService = {
  getAllContracts: async () => {
    const response = await api.get('/contracts');
    return response.data;
  },
  getContractById: async (id) => {
    const response = await api.get(`/contracts/${id}`);
    return response.data;
  },
  createContract: async (contractData) => {
    const response = await api.post('/contracts', contractData);
    return response.data;
  },
  updateContract: async (id, contractData) => {
    const response = await api.put(`/contracts/${id}`, contractData);
    return response.data;
  },
  deleteContract: async (id) => {
    const response = await api.delete(`/contracts/${id}`);
    return response.data;
  }
};

// Servicios para usuarios (admin)
const userService = {
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

export {
  api,
  authService,
  propertyService,
  visitService,
  contractService,
  userService
};