import React, { useEffect, useState, useContext } from "react";
import Texto from "../../components/Texto";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { buscaUsuarioPorIdPlano } from "../../services/requests/usuario";
import AuthContext from '../../components/AuthContext';

export default function Perfil() {
  const [usuario, setUsuario] = useState({});
  const { userIdPlano } = useContext(AuthContext);
  const navigation = useNavigation();

  async function busca() {
    try {
      const resultado = await buscaUsuarioPorIdPlano(userIdPlano);
      if (resultado != null) {
        setUsuario(resultado);
      } else {
        Alert.alert('Usuario não encontrado');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao buscar usuário');
    }
  }

  useEffect(() => {
    busca();
  }, []);

  return (
    <>
      <Texto style={estilos.titulo}>Meu perfil</Texto>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Nome:</Texto>
          <Texto style={estilos.conteudo}>{usuario.nome}</Texto>
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>E-mail:</Texto>
          <Texto style={estilos.conteudo}>{usuario.email}</Texto>
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Telefone:</Texto>
          <Texto style={estilos.conteudo}>{usuario.telefone}</Texto>
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Data de nascimento:</Texto>
          <Texto style={estilos.conteudo}>{usuario.data}</Texto>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Modelo", { 
            screen: 'EditarDados', 
            usuario: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            data: usuario.data
          })}
        style={estilos.botoes}>
        <Texto style={estilos.textos}>Editar dados</Texto>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Modelo", { screen: 'EditarCartao', senha: usuario.senha })}
        style={estilos.botoes}>
        <Texto style={estilos.textos}>Editar cartão</Texto>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Modelo", { screen: 'MudarSenha', usuario: usuario })}
        style={estilos.botoes}>
        <Texto style={estilos.textos}>Mudar senha</Texto>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Modelo", { screen: 'ExcluirConta', usuario: usuario })}
        style={estilos.botoes}>
        <Texto style={estilos.textos}>Excluir conta</Texto>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Modelo", { screen: 'SairConta', usuario: usuario })}
        style={estilos.botoes}>
        <Texto style={estilos.textos}>Sair da conta</Texto>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '700',
    color: '#483E3E',
    textAlign: 'center',
    marginTop: 17,
    marginBottom: 39
  },
  conteiner: {
    marginHorizontal: 25,
    marginBottom: 45,
    borderWidth: 1,
    borderColor: '#483E3E',
    paddingHorizontal: 11,
    paddingTop: 11
  },
  informacoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  tituloInfo: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: '#483E3E'
  },
  conteudo: {
    borderWidth: 1,
    borderColor: '#A6AEB3',
    paddingVertical: 3,
    paddingHorizontal: 11,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    color: '#483E3E'
  },
  botoes: {
    backgroundColor: "#867070",
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 14,
    marginHorizontal: 105
  },
  textos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
