import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Páginas públicas
import Home from '../pages/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import PropertyList from '../pages/properties/PropertyList';
import PropertyDetail from '../pages/properties/PropertyDetail';

// Páginas de cliente
import ClientDashboard from '../pages/client/Dashboard';
import ClientVisits from '../pages/client/Visits';
import ClientContracts from '../pages/client/Contracts';

// Páginas de agente
import AgentDashboard from '../pages/agent/Dashboard';
import AgentProperties from '../pages/agent/Properties';
import AgentVisits from '../pages/agent/Visits';
import AgentContracts from '../pages/agent/Contracts';

// Páginas de administrador
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminProperties from '../pages/admin/Properties';
import AdminReports from '../pages/admin/Reports';

// Componente de ruta protegida
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Aquí implementarías la lógica para verificar si el usuario está autenticado
  // y si tiene el rol adecuado para acceder a la ruta
  const isAuthenticated = localStorage.getItem('token') !== null;
  const userRole = localStorage.getItem('userRole');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        
        {/* Rutas de cliente */}
        <Route 
          path="/client/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['client', 'agent', 'admin']}>
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/visits" 
          element={
            <ProtectedRoute allowedRoles={['client', 'agent', 'admin']}>
              <ClientVisits />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client/contracts" 
          element={
            <ProtectedRoute allowedRoles={['client', 'agent', 'admin']}>
              <ClientContracts />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas de agente */}
        <Route 
          path="/agent/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['agent', 'admin']}>
              <AgentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agent/properties" 
          element={
            <ProtectedRoute allowedRoles={['agent', 'admin']}>
              <AgentProperties />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agent/visits" 
          element={
            <ProtectedRoute allowedRoles={['agent', 'admin']}>
              <AgentVisits />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/agent/contracts" 
          element={
            <ProtectedRoute allowedRoles={['agent', 'admin']}>
              <AgentContracts />
            </ProtectedRoute>
          } 
        />
        
        {/* Rutas de administrador */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/properties" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminProperties />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminReports />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;