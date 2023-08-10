import React, { useContext, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Texto from "../../components/Texto";
import AuthContext from "../../components/AuthContext"; // Importe o AuthContext


export default function Cadastro() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const authContext = useContext(AuthContext);
  const [confirmarSenhaUsuario, setConfirmarSenhaUsuario] = useState('');
  const [nascimentoUsuario, setNascimentoUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');
  const navigation = useNavigation();

  const emailRef = useRef();
  const senhaRef = useRef();
  const confirmarSenhaRef = useRef();
  const nascimentoRef = useRef();
  const telefoneRef = useRef();

  const validarCampos = () => {
    if (
      nomeUsuario.trim() === '' ||
      emailUsuario.trim() === '' ||
      senhaUsuario.trim() === '' ||
      confirmarSenhaUsuario.trim() === '' ||
      nascimentoUsuario.trim() === '' ||
      telefoneUsuario.trim() === ''
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }

    if (!emailValido(emailUsuario)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return false;
    }

    if (senhaUsuario.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
      return false;
    }

    if (senhaUsuario !== confirmarSenhaUsuario) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }

    if (!dataValida(nascimentoUsuario)) {
      Alert.alert('Erro', 'Por favor, digite uma data válida (ano-mês-dia).');
      return false;
    }

    if (!telefoneValido(telefoneUsuario)) {
      Alert.alert('Erro', 'Por favor, digite um número de telefone válido (ex: (dd) 12345-8912).');
      return false;
    }

    if (nomeUsuario.length < 3) {
      Alert.alert('Erro', 'O nome deve ter mais do que 2 caracteres.');
      return false;
    }

    return true;
  };

  const emailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const dataValida = (data) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(data);
  };

  const telefoneValido = (telefone) => {
    const regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
  };

  const handleCadastro = () => {
    authContext.setUserSenha(senhaUsuario);
    if (validarCampos()) {
      navigation.navigate('PlanoComTeste', {
        usuario: nomeUsuario, 
        emailUsuario: emailUsuario,
        senhaUsuario: senhaUsuario,
        confirmarSenhaUsuario: confirmarSenhaUsuario,
        nascimentoUsuario: nascimentoUsuario,
        telefoneUsuario: telefoneUsuario
      });
    }
  };

  const formatarData = (input) => {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    // Formate a data como desejar
    let formattedDate = `${year}-${month}-${day}`;

    setNascimentoUsuario(formattedDate);
  };

  const formatarTelefone = (input) => {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const ddd = value.slice(0, 2);
    const part1 = value.slice(2, 7);
    const part2 = value.slice(7, 11);

    // Formate o telefone como desejar
    let formattedPhone = `(${ddd}) ${part1}-${part2}`;

    setTelefoneUsuario(formattedPhone);
  };

  return (
    <>
      <View style={estilos.cadastro}>
        <TextInput
          placeholder="Nome"
          autoCapitalize="none"
          style={estilos.campos}
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
        />
        <TextInput
          placeholder="E-mail"
          autoCapitalize="none"
          style={estilos.campos}
          value={emailUsuario}
          onChangeText={setEmailUsuario}
        />
        <TextInput
          placeholder="Senha"
          autoCapitalize="none"
          style={estilos.campos}
          secureTextEntry
          value={senhaUsuario}
          onChangeText={setSenhaUsuario}
        />
        <TextInput
          placeholder="Confirmar a senha"
          autoCapitalize="none"
          style={estilos.campos}
          secureTextEntry
          value={confirmarSenhaUsuario}
          onChangeText={setConfirmarSenhaUsuario}
        />
        <TextInput
          placeholder="Nascimento (ano-mês-dia)"
          autoCapitalize="none"
          style={estilos.campos}
          value={nascimentoUsuario}
          keyboardType='numeric'
          onChangeText={formatarData}
        />
        <TextInput
          placeholder="Telefone (11 12345-6789)"
          autoCapitalize="none"
          style={estilos.campos}
          keyboardType='numeric'
          value={telefoneUsuario}
          onChangeText={formatarTelefone}
        />
      </View>
      <TouchableOpacity style={estilos.botao} onPress={handleCadastro}>
        <Texto style={estilos.textoBotao}>Cadastrar-se</Texto>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  cadastro: {
    width: "70%",
    paddingHorizontal: 16,
    paddingTop: 3,
    paddingBottom: 11,
  },
  campos: {
    fontSize: 16,
    fontWeight: "400",
    color: "#A6AEB3",
    borderBottomWidth: 1,
    borderBottomColor: "#867070",
  },
  botao: {
    marginTop: 22,
    backgroundColor: "#867070",
    paddingHorizontal: 50,
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
