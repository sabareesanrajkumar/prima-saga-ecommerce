import React, { useState, useCallback, useEffect, useContext } from 'react';
import { CartContext } from '../Cart/CartContext';

export const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isActive, setIsActive] = useState(true);

  const loginHandler = useCallback((token) => {
    setToken(token);
    localStorage.setItem('token', token);
    resetTimer();
  });
  const { saveCartBeforeLogout } = useContext(CartContext);
  const logoutHandler = useCallback(async () => {
    await saveCartBeforeLogout();
    setToken(null);
    localStorage.removeItem('token');
    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const resetTimer = useCallback(() => {
    if (logoutTimer) clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      logoutHandler();
      alert('You have been logged out due to inactivity.');
    }, 50000000);
  }, [logoutHandler]);

  useEffect(() => {
    const activityHandler = () => {
      setIsActive(true);
      if (token) resetTimer();
    };

    window.addEventListener('mousemove', activityHandler);

    return () => {
      window.removeEventListener('mousemove', activityHandler);
    };
  }, [token, resetTimer]);

  useEffect(() => {
    if (token) {
      resetTimer();
    }
  }, [token, resetTimer]);

  const contextValue = {
    token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
