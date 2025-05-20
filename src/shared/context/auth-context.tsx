import React, { createContext, useState, useCallback, useEffect } from 'react';

export interface AuthContextType {
  isUserUnauthorized: boolean;
  setIsUserUnauthorized: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isUserUnauthorized, setIsUserUnauthorized] = useState(true);

  useEffect(() => {
    const tokenName = 'authDysonToken';
    const token = localStorage.getItem(tokenName);
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
