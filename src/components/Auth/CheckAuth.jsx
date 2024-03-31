import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function CheckAuth() {
  const { auth, isLoading, error } = useAuth();
  const location = useLocation();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!auth?.data?.token) {
      setShouldRedirect(true);
    }
  }, [auth]);

  if (isLoading) {
    
    return <div>Loading...</div>;
  }

  if (error) {
    
    return <div>Error: {error.message}</div>;
  }

  return shouldRedirect ? (
    <Navigate to="/login" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}

export default CheckAuth;
