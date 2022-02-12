import React from 'react';
import { Navigate } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypeSelector';

interface IChildren {
  children?: any
}
export const PrivateRoute: React.FC<IChildren> = ({ children }) => {
  const userID = useTypedSelector((state) => state.user.userData?.id);
  return ((userID !== null) ? children : <Navigate to="/" />);
};
