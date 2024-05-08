import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import RootStore from '../stores/root.store';

interface PrivateRouteProps {
  children: React.ReactNode;
    rootStore: typeof RootStore
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, rootStore }) => {
  const location = useLocation();
  const isLoggedIn = rootStore.authStore.isLoggedIn;

  if (!isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;