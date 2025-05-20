import { useContext } from 'react';
import { AuthContext } from '@shared/context/auth-context';
import { AuthContextType } from '@shared/context/auth-context';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
