import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Texto from "../../components/Texto";
import { alterarUsuario } from "../../services/requests/usuario";

import AuthContext from "../../components/AuthContext";
import Header from "../../components/Header";
import Modelo from "../../components/Modelo";
import estilos from "./styles";

export default function MudaSenha() {
  const { 
        usuarioId,
        nomeUsuario,
        emailUsu,
        userSenha,
        dataUsuario,
        telefoneUsuario,
        userIdPlano,
        tipoPlanoUsuario,
        planoMensalUsuario,
        planoAnualUsuario,
        updateAuthState
   } = useContext(AuthContext);
  const navigation = useNavigation();
  const [senhaAtual, setSenhaAtual] = useState(userSenha);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function validarCampos() {
    if (senhaAtual.trim() === "" || novaSenha.trim() === "" || confirmarSenha.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }

    if (senhaAtual !== userSenha) {
      Alert.alert("Erro", "A senha atual está incorreta.");
      return false;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "A nova senha não corresponde à confirmação da senha.");
      return false;
    }

    return true;
  }

  async function alterar() {
    if (validarCampos()) {
        console.log(emailUsu);
        const resultado = await alterarUsuario(
            usuarioId,
            nomeUsuario,
            emailUsu,
            novaSenha,
            confirmarSenha,
            dataUsuario,
            telefoneUsuario,
            userIdPlano,
            tipoPlanoUsuario,
            planoMensalUsuario,
            planoAnualUsuario
        );
    
        if (resultado === "sucesso") {
          Alert.alert("Senha atualizado!");
          updateAuthState({ userSenha: novaSenha });
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Chatbot' }],
            })
          );
        } else {
          Alert.alert("Erro ao atualizar o usuário!");
        }
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
        <Header voltar/>
        <Modelo>
      <Texto style={estilos.titulo}>Mudar senha</Texto>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Senha atual: </Texto>
          <TextInput
            autoCapitalize="none"
            style={estilos.conteudo}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            secureTextEntry
            placeholderTextColor="#000000"
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Nova senha: </Texto>
          <TextInput
            autoCapitalize="none"
            style={estilos.conteudo}
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry
            placeholderTextColor="#000000"
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Confirme a nova senha: </Texto>
          <TextInput
            autoCapitalize="none"
            style={estilos.conteudo}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            placeholderTextColor="#000000"
          />
        </View>
      </View>
      <TouchableOpacity style={estilos.botoes} onPress={alterar}>
        <Texto style={estilos.textos}>Alterar Senha</Texto>
      </TouchableOpacity>
      </Modelo>
    </ScrollView>
  );
}
