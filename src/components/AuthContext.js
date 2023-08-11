import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userIdPlano, setUserIdPlano] = useState('');
  const [userToken, setUserToken] = useState('');
  const [userSenha, setUserSenha] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsu, setEmailUsu] = useState('');
  const [confirmarSenhaUsuario, setConfirmarSenhaUsuario] = useState('');
  const [dataUsuario, setDataUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');
  const [tipoPlanoUsuario, setTipoPlanoUsuario] = useState('');
  const [planoMensalUsuario, setPlanoMensalUsuario] = useState('');
  const [planoAnualUsuario, setPlanoAnualUsuario] = useState('');
  const [idDoCartao, setIdDoCartao] = useState('');
  const [nomeNoCartao, setNomeNoCartao] = useState('');
  const [numeroDoCartao, setNumeroDoCartao] = useState('');
  const [validadeDoCartao, setValidadeDoCartao] = useState('');
  const [codigoDoCartao, setCodigoDoCartao] = useState('');

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      userIdPlano, 
      setUserIdPlano, 
      userToken, 
      setUserToken, 
      userSenha, 
      setUserSenha, 
      usuarioId, 
      setUsuarioId,
      nomeUsuario,
      setNomeUsuario,
      emailUsu, 
      setEmailUsu,
      confirmarSenhaUsuario,
      setConfirmarSenhaUsuario,
      dataUsuario,
      setDataUsuario,
      telefoneUsuario,
      setTelefoneUsuario,
      tipoPlanoUsuario,
      setTipoPlanoUsuario,
      planoMensalUsuario,
      setPlanoMensalUsuario,
      planoAnualUsuario,
      setPlanoAnualUsuario,
      idDoCartao,
      setIdDoCartao,
      nomeNoCartao,
      setNomeNoCartao,
      numeroDoCartao,
      setNumeroDoCartao,
      validadeDoCartao,
      setValidadeDoCartao,
      codigoDoCartao,
      setCodigoDoCartao
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
