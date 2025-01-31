import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminRoute = ({ children }) => {
  const isAdmin = useAdminAuth();
  
  if (!isAdmin) {
    return <Navigate to="/admin-login" />;
  }
  
  return children;
};

export default AdminRoute