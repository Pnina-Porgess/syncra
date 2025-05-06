import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { userId } = useParams();
  const { user } = useUser(); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  if ( user.id !== userId) {
    return <Navigate to="/404" />;
  }

  return children;
};

export default ProtectedRoute;

 



