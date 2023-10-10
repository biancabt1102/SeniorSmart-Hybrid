import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import Header from "../../components/Header";
import Modelo from "../../components/Modelo";
import Texto from "../../components/Texto";
import { buscaUsuarioPorId } from "../../services/requests/usuario";
import estilos from "./styles";

const Perfil = () => {
  const { usuarioId, updateAuthState} = useContext(AuthContext);
  const navigation = useNavigation();
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsu] = useState('');
  const [dataUsuario, setDataUsu] = useState('');

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  useEffect(() => {
    buscaUsuario();
  }, []);

  async function buscaUsuario() {
    try {
      const resposta = await buscaUsuarioPorId(usuarioId);
      setNomeUsuario(resposta.nome); 
      updateAuthState({ 
        emailUsu : resposta.email, 
        dataUsuario : resposta.data,
        telefoneUsuario: resposta.telefone
      });
      setEmailUsuario(resposta.email);
      setTelefoneUsu(resposta.telefone);
      setDataUsu(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }

  return (
    <>
      <Header/>
     <Modelo>
      <Texto style={estilos.titulo}>Meu perfil</Texto>
      <View style={estilos.container}>
        <View style={estilos.informacao}>
          <Texto style={estilos.tituloInfo}>Nome:</Texto>
          <Texto style={estilos.conteudo}>{nomeUsuario}</Texto>
        </View>
        <View style={estilos.informacao}>
          <Texto style={estilos.tituloInfo}>E-mail:</Texto>
          <Texto style={estilos.conteudo}>{emailUsuario}</Texto>
        </View>
        <View style={estilos.informacao}>
          <Texto style={estilos.tituloInfo}>Telefone:</Texto>
          <Texto style={estilos.conteudo}>{telefoneUsuario}</Texto>
        </View>
        <View style={estilos.informacao}>
          <Texto style={estilos.tituloInfo}>Data de nascimento:</Texto>
          <Texto style={estilos.conteudo}>{dataUsuario}</Texto>
        </View>
      </View>
      {['Editar Dados', 'Editar Cartao', 'Mudar Senha', 'Excluir Conta', 'Sair Conta'].map((screenName) => (
        <TouchableOpacity
          key={screenName}
          onPress={() => navigateToScreen(screenName)}
          style={estilos.botao}
        >
          <Texto style={estilos.textoBotao}>{screenName}</Texto>
        </TouchableOpacity>
      ))}
     </Modelo>
    </>
  );
}

export default Perfil;
