import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AuthContext from "../../components/AuthContext";
import { buscaUsuarioEmail, loginUsuario } from "../../services/requests/usuario";
import estilos from '../../styles/LoginStyles';
import Header from "../../components/Header";
import Entrar from "../../components/Entrar"
import { validarLogin } from "../../components/ValidacoesUsuario";

export default function Login() {
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const { 
    setUsuarioId,
    setUserSenha,
    setUserIdPlano, 
    setTipoPlanoUsuario,
    setPlanoMensalUsuario,
    setPlanoAnualUsuario, 
    setIsLoggedIn, 
    isLoggedIn,
    setNomeUsuario
  } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Chatbot');
    }
  }, []);

  async function realizarLogin() {
    try {
      const token = await loginUsuario(emailUsuario, senhaUsuario);

      if (token) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
        setIsLoggedIn(true);
        await buscarUsuario();
      } else {
        Alert.alert('Erro ao fazer login!');
      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o login. Tente novamente mais tarde.');
    }
  }

  async function buscarUsuario() {
    try {
      const resposta = await buscaUsuarioEmail(emailUsuario);
      setUsuarioId(resposta.id);
      setNomeUsuario(resposta.nome);
      setUserSenha(senhaUsuario);
      setUserIdPlano(resposta.plano.id);
      setTipoPlanoUsuario(resposta.plano.tipoPlano);
      setPlanoMensalUsuario(resposta.plano.planoMensal);
      setPlanoAnualUsuario(resposta.plano.planoAnual);
      return resposta;
    } catch (error) {
      console.error('Erro ao buscar o usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o usuário. Tente novamente mais tarde.');
    }
  }

  async function handleLogin() {
    if (validarLogin(emailUsuario, senhaUsuario) == null) {
      realizarLogin();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Chatbot' }],
        })
      );
    } else {
      Alert.alert(validarLogin(emailUsuario, senhaUsuario))
    }
  }

  return (
    <>
      <Header voltar/>
      <Entrar>
      <View style={estilos.login}>
        <Text style={estilos.titulo}>Entre na sua conta:</Text>
        <TextInput
          placeholder="E-mail"
          autoCapitalize="none"
          style={estilos.campos}
          value={emailUsuario}
          onChangeText={setEmailUsuario}
          placeholderTextColor="#000000"
        />
        <TextInput
          placeholder="Senha"
          autoCapitalize="none"
          style={estilos.campos}
          value={senhaUsuario}
          onChangeText={setSenhaUsuario}
          secureTextEntry
          placeholderTextColor="#000000"
        />
      </View>
      <TouchableOpacity style={estilos.botao} onPress={handleLogin}>
        <Text style={estilos.textoBotao}>Entrar</Text>
      </TouchableOpacity>
      <Text style={estilos.titulo}>Ainda não possui conta?</Text>
      <TouchableOpacity style={estilos.botao} onPress={() => { navigation.navigate('Cadastro')}}>
        <Text style={estilos.textoBotao}>Cadastrar-se</Text>
      </TouchableOpacity>
      </Entrar>
    </>
  );
}