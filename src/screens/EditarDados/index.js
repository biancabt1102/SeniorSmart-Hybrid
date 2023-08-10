import React, { useContext, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import Texto from "../../components/Texto";
import { alterarUsuario } from "../../services/requests/usuario"

import AuthContext from "../../components/AuthContext"; // Importe o AuthContext


export default function EditarDados({ route, navigation }) {
  const [nome, setNome] = useState(route.params.usuario);
  const [email, setEmail] = useState(route.params.email);
  const [telefone, setTelefone] = useState(route.params.telefone);
  const [data, setData] = useState(route.params.data);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const authContext = useContext(AuthContext);
  const senha = authContext.userSenha;

  async function alterar() {
    console.log(authContext.usuarioId)
    
    if (!nome || !email || !telefone || !data || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    if (!validarTelefone(telefone)) {
      Alert.alert("Erro", "Por favor, insira um número de telefone válido.");
      return;
    }
    

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "A senha digitada não corresponde à senha atual.");
      return;
    }

    // Restante do código para editar os dados
    const resultado = await alterarUsuario(
      authContext.usuarioId,
      nome,
      email,
      route.params.usuario.senhaUsuario,
      route.params.usuario.confirmarSenhaUsuario,
      data,
      telefone,
    );

    if (resultado === "sucesso") {
      Alert.alert("Repositório atualizado!");
      navigation.goBack();
    } else {
      Alert.alert("Erro ao atualizar o repositório!");
    }
  }

  function validarEmail(email) {
    // Implemente sua validação de email aqui
    // Retorne true se o email for válido e false caso contrário
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  }

  function validarTelefone(telefone) {
    // Implemente sua validação de telefone aqui
    // Retorne true se o telefone for válido e false caso contrário
    return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
  }

  function formatarTelefone(input) {
    const digits = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    let formattedPhone = "";

    if (digits.length > 0) {
      formattedPhone += `(${digits.slice(0, 2)})`;
    }
    if (digits.length > 2) {
      formattedPhone += ` ${digits.slice(2, 7)}`;
    }
    if (digits.length > 7) {
      formattedPhone += `-${digits.slice(7, 11)}`;
    }

    setTelefone(formattedPhone);
  }

  function formatarData(input) {
    const digits = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    let formattedDate = "";

    if (digits.length > 0) {
      formattedDate += digits.slice(0, 4);
    }
    if (digits.length > 4) {
      formattedDate += `-${digits.slice(4, 6)}`;
    }
    if (digits.length > 6) {
      formattedDate += `-${digits.slice(6, 8)}`;
    }

    setData(formattedDate);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Texto style={estilos.titulo}>Meu perfil</Texto>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Nome: </Texto>
          <TextInput
            placeholder="Nome do usuário"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={nome}
            onChangeText={setNome}
            multiline
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>E-mail: </Texto>
          <TextInput
            placeholder="E-mail do usuário"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={email}
            onChangeText={setEmail}
            multiline
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Telefone: </Texto>
          <TextInput
            placeholder="Telefone do usuário"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={telefone}
            onChangeText={formatarTelefone}
            keyboardType="phone-pad"
            multiline
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Data de nascimento: </Texto>
          <TextInput
            placeholder="Nascimento"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={data}
            onChangeText={formatarData}
            keyboardType="numeric"
            multiline
          />
        </View>
      </View>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Digite sua senha: </Texto>
          <TextInput
            placeholder="Coloque sua senha"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity style={estilos.botoes} onPress={alterar}>
        <Texto style={estilos.textos}>Editar Dados</Texto>
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
    maxWidth: '65%',
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
