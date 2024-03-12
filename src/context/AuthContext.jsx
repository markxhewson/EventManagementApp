import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    // Check if authentication data exists in localStorage on component mount
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      login(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));

    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');

    setUser({});
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
