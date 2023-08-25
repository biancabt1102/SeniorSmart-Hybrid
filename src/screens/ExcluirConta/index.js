import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import Texto from "../../components/Texto";
import { deletarUsuario } from "../../services/requests/usuario";


import AuthContext from "../../components/AuthContext"; // Importe o AuthContext
import { useNavigation } from "@react-navigation/native";

export default function ExcluirConta() {
  const navigation = useNavigation();
  const { userSenha, usuarioId, setIsLoggedIn} = useContext(AuthContext);
  const senha = userSenha;
  const [confirmarSenha, setConfirmarSenha] = useState("");
  
  

  // Função deletar
async function deletar() {
  if (confirmarSenha === senha) {
    try {
      const resultado = await deletarUsuario(usuarioId);
      console.log("mamamia:", resultado);
      if (resultado === "Sucesso") {
        Alert.alert("Conta excluída com sucesso!");
        setIsLoggedIn(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }] // Troque 'Home' pelo nome da sua tela inicial
        });
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
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "700",
    color: "#483E3E",
    textAlign: "center",
    marginTop: 17,
    marginBottom: 39,
  },
  conteiner: {
    marginHorizontal: 25,
    marginBottom: 45,
    borderWidth: 1,
    borderColor: "#483E3E",
    paddingHorizontal: 11,
    paddingTop: 11,
  },
  informacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  tituloInfo: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: "#483E3E",
  },
  conteudo: {
    borderWidth: 1,
    borderColor: "#A6AEB3",
    paddingVertical: 3,
    paddingHorizontal: 11,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: "#000000",
    maxWidth: "65%",
    maxHeight: 100,
  },
  botoes: {
    backgroundColor: "#867070",
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 14,
    marginHorizontal: 105,
  },
  textos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
