import React, { useContext, useState } from "react";
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import Texto from "../../components/Texto";
import { deletarUsuario } from "../../services/requests/usuario";


import { CommonActions, useNavigation } from "@react-navigation/native";
import AuthContext from "../../components/AuthContext";
import estilos from "./styles";
import Header from "../../components/Header";
import Modelo from "../../components/Modelo";

export default function ExclusaoConta() {
  const navigation = useNavigation();
  const { userSenha, usuarioId, updateAuthState, setIsLoggedIn } = useContext(AuthContext);
  const senha = userSenha;
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  

  // Função deletar
async function deletar() {
  if (confirmarSenha === senha) {
    try {
      const resultado = await deletarUsuario(usuarioId);
      if (resultado === "Sucesso") {
        Alert.alert("Conta excluída com sucesso!");
        setIsLoggedIn(false);
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
        );
      } else {
        Alert.alert("Erro ao excluir a conta!");
      }
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
    } else {
      Alert.alert("Senha incorreta. Por favor, tente novamente.");
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Header voltar/>
      <Modelo>
      <Texto style={estilos.titulo}>Excluir conta</Texto>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Digite sua senha: </Texto>
          <TextInput
            placeholder="Coloque sua senha"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry={true}
            placeholderTextColor="#000000"
          />
        </View>
      </View>
      <TouchableOpacity style={estilos.botoes} onPress={deletar}>
        <Texto style={estilos.textos}>Excluir conta</Texto>
      </TouchableOpacity>
      </Modelo>
    </ScrollView>
  );
}
