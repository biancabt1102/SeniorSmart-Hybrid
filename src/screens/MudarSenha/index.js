import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import Texto from "../../components/Texto";
import { alterarUsuario } from "../../services/requests/usuario"
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../../components/AuthContext"; // Importe o AuthContext

export default function MudarSenha() {
  const { 
    userSenha, 
    usuarioId, 
    nomeUsuario, 
    emailUsu, 
    telefoneUsuario, 
    dataUsuario,
    userIdPlano,
    tipoPlanoUsuario,
    planoMensalUsuario,
    planoAnualUsuario
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
          Alert.alert("Usuario atualizado!");
          navigation.goBack();
        } else {
          Alert.alert("Erro ao atualizar o usuário!");
        }
    }
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
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
    maxWidth: '50%',
    maxHeight: 100
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
