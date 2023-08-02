import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIdPlano, setUserIdPlano] = useState('');
  const [userToken, setUserToken] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userIdPlano, setUserIdPlano, userToken, setUserToken}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
