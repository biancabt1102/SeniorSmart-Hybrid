import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estados relacionados ao usuário
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

  // Estados relacionados ao plano
  const [tipoPlanoUsuario, setTipoPlanoUsuario] = useState('');
  const [planoMensalUsuario, setPlanoMensalUsuario] = useState('');
  const [planoAnualUsuario, setPlanoAnualUsuario] = useState('');

  // Estados relacionados ao cartão
  const [idDoCartao, setIdDoCartao] = useState('');
  const [nomeNoCartao, setNomeNoCartao] = useState('');
  const [numeroDoCartao, setNumeroDoCartao] = useState('');
  const [validadeDoCartao, setValidadeDoCartao] = useState('');
  const [codigoDoCartao, setCodigoDoCartao] = useState('');

  // Outros estados
  const [vozVirtual, setVozVirtual] = useState(5000);
  const [velVoz, setVelVoz] = useState(0.4);

  return (
    <AuthContext.Provider value={{ 
      // Estados relacionados ao usuário
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

      // Estados relacionados ao plano
      tipoPlanoUsuario,
      setTipoPlanoUsuario,
      planoMensalUsuario,
      setPlanoMensalUsuario,
      planoAnualUsuario,
      setPlanoAnualUsuario,

      // Estados relacionados ao cartão
      idDoCartao,
      setIdDoCartao,
      nomeNoCartao,
      setNomeNoCartao,
      numeroDoCartao,
      setNumeroDoCartao,
      validadeDoCartao,
      setValidadeDoCartao,
      codigoDoCartao,
      setCodigoDoCartao,

      // Outros estados
      vozVirtual,
      setVozVirtual,
      velVoz,
      setVelVoz,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
