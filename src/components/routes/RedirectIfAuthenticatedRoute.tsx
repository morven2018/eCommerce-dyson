import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/context/auth-hooks';
import { JSX } from 'react';

export const RedirectIfAuthenticatedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { isUserUnauthorized } = useAuth();
  const location = useLocation();

  if (!isUserUnauthorized) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
