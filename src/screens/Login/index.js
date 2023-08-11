import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { buscaUsuarioEmail, loginUsuario } from "../../services/requests/usuario";
import AuthContext from '../../components/AuthContext';


export default function Login({ route }) {
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const { setIsLoggedIn, 
    setUserIdPlano, 
    setUserToken, 
    setNomeUsuario, 
    setEmailUsu, 
    setUsuarioId,
    setUserSenha,
    setConfirmarSenhaUsuario,
    setDataUsuario,
    setTelefoneUsuario,
    setPlanoMensalUsuario,
    setPlanoAnualUsuario
  } = useContext(AuthContext);
  const navigation = useNavigation();
  let token = '';
  let response = {};

  async function login(){
    token = await loginUsuario(
      emailUsuario,
      senhaUsuario
    )

    if (token != null) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      setIsLoggedIn(true);
      response = procuraUsuario();
      setUserToken(token);
    } else {
      Alert.alert('Erro ao Fazer Login!');
    }
  }


  async function procuraUsuario() {
    const resposta = await buscaUsuarioEmail(emailUsuario);
    setUsuarioId(resposta.id);
    setNomeUsuario(resposta.nome);
    setEmailUsu(resposta.email);
    setUserSenha(senhaUsuario);
    setConfirmarSenhaUsuario(resposta.confirmarSenha);
    setDataUsuario(resposta.data)
    setTelefoneUsuario(resposta.telefone)
    setUserIdPlano(resposta.plano.id);
    setTipoPlanoUsuario(resposta.plano.tipoPlano);
    setPlanoMensalUsuario(resposta.plano.planoMensal);
    setPlanoAnualUsuario(resposta.plano.planoAnual)
    return resposta;
  }

  function validarCampos() {
    if (!emailUsuario || !senhaUsuario) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }

    if (!validarEmail(emailUsuario)) {
      Alert.alert("Erro", "Por favor, insira um e-mail válido.");
      return false;
    }

    return true;
  }

  function validarEmail(email) {
    // Implemente sua validação de e-mail aqui
    // Retorne true se o e-mail for válido e false caso contrário
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  function handleLogin() {
    if (validarCampos()) {
      // Restante do código para realizar o login
      // Navegue para a próxima tela ou realize a autenticação do usuário
      login();
      navigation.navigate('Chatbot');
    }
  }

  return (
    <>
      <View style={styles.login}>
        <Text style={styles.titulo}>Entre na sua conta:</Text>
        <TextInput
          placeholder="E-mail"
          autoCapitalize="none"
          style={styles.campos}
          value={emailUsuario}
          onChangeText={setEmailUsuario}
        />
        <TextInput
          placeholder="Senha"
          autoCapitalize="none"
          style={styles.campos}
          value={senhaUsuario}
          onChangeText={setSenhaUsuario}
          secureTextEntry  // Exibe a senha como formato de senha
        />
      </View>
      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Ainda não possui conta?</Text>
      <TouchableOpacity style={styles.botao} onPress={() => { navigation.navigate('Entrar', {screen: 'Cadastro'}) }}>
        <Text style={styles.textoBotao}>Cadastrar-se</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  login: {
    width: "66%",
    paddingHorizontal: 16,
    paddingTop: 3,
    paddingBottom: 11,
  },
  titulo: {
    marginTop: 30,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "400",
    color: "#000000",
    marginBottom: 10,
  },
  campos: {
    fontSize: 16,
    fontWeight: "400",
    color: "#A6AEB3",
    borderBottomWidth: 1,
    borderBottomColor: "#867070",
  },
  botao: {
    marginTop: 20,
    backgroundColor: "#867070",
    paddingHorizontal: 60,
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
  },
  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
