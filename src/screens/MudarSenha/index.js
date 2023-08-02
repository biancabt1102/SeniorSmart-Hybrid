import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import Texto from "../../components/Texto";

export default function MudarSenha({ route, navigation }) {
  const [senhaAtual, setSenhaAtual] = useState(route.params.usuario.senhaUsuario);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function validarCampos() {
    if (senhaAtual.trim() === "" || novaSenha.trim() === "" || confirmarSenha.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }

    if (senhaAtual !== route.params.usuario.senha) {
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
            route.params.usuario.idUsuario,
            route.params.usuario.nome,
            route.params.usuario.email,
            novaSenha,
            confirmarSenha,
            route.params.usuario.data,
            route.params.usuario.telefone,
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
    color: "#483E3E",
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
