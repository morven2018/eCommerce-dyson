import React, { createContext, useState, useCallback, useEffect } from 'react';

export interface AuthContextType {
  isUserUnauthorized: boolean;
  setIsUserUnauthorized: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isUserUnauthorized, setIsUserUnauthorized] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authDysonToken');
    if (token) {
      setIsUserUnauthorized(false);
    }
  }, []);

  const value = {
    isUserUnauthorized,
    setIsUserUnauthorized: useCallback((value: boolean) => {
      setIsUserUnauthorized(value);
    }, []),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
