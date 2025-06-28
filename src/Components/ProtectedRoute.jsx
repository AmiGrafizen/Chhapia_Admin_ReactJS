import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('authToken'); 

  if (!token) {
    console.error("No auth token found, redirecting to login.");
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
