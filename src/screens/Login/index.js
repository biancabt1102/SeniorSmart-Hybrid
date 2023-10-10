import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AuthContext from "../../components/AuthContext";
import { buscaUsuarioEmail, loginUsuario } from "../../services/requests/usuario";
import estilos from './styles';
import Header from "../../components/Header";
import Entrada from "../../components/Entrada"
import { validarLogin } from "../../components/ValidacoesUsuario";

export default function Login() {
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const { updateAuthState, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
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
        await updateAuthState({userSenha: senhaUsuario});
        console.log(isLoggedIn);
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
      updateAuthState({
        usuarioId: resposta.id,
        nomeUsuario: resposta.nome,
        userSenha: senhaUsuario,
        userIdPlano: resposta.plano.id,
        tipoPlanoUsuario: resposta.plano.tipoPlano,
        planoMensalUsuario: resposta.plano.planoMensal,
        planoAnualUsuario: resposta.plano.planoAnual,
      });
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
      <Entrada>
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
      </Entrada>
    </>
  );
}