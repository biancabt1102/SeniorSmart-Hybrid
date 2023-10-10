import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const initialState = {
  // Estados relacionados ao usuário
  userIdPlano: '',
  userToken: '',
  userSenha: '',
  usuarioId: '',
  nomeUsuario: '',
  emailUsu: '',
  confirmarSenhaUsuario: '',
  dataUsuario: '',
  telefoneUsuario: '',

  // Estados relacionados ao plano
  tipoPlanoUsuario: '',
  planoMensalUsuario: '',
  planoAnualUsuario: '',

  // Estados relacionados ao cartão
  idDoCartao: '',
  nomeNoCartao: '',
  numeroDoCartao: '',
  validadeDoCartao: '',
  codigoDoCartao: '',

  // Outros estados
  vozVirtual: 5000,
  velVoz: 0.4,
  tamanhoFonte: 'normal',
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateAuthState = (newState) => {
    setAuthState({ ...authState, ...newState });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, 
      setIsLoggedIn, ...authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
