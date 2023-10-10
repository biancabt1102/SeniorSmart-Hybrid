import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import Header from "../../components/Header";
import Modelo from "../../components/Modelo";
import Texto from "../../components/Texto";
import { validarEditarDados } from "../../components/ValidacoesUsuario";
import { alterarUsuario, buscaUsuarioPorId } from "../../services/requests/usuario";
import estilos from "./styles";

export default function EdicaoDados() {
  // Contexto e navegação
  const { 
    userSenha, 
    usuarioId,
    userIdPlano,
    tipoPlanoUsuario,
    planoMensalUsuario,
    planoAnualUsuario,
  } = useContext(AuthContext);
  const navigation = useNavigation();

  // Estados para os campos de edição
  const [nome, setNomeUsuario] = useState('');
  const [email, setEmailUsuario] = useState('');
  const [telefone, setTelefoneUsuario] = useState('');
  const [data, setDataUsuario] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const emailRef = useRef();
  const senhaRef = useRef();
  const nascimentoRef = useRef();
  
  useEffect(() => {
    buscaUsuario();
  }, []);

  async function buscaUsuario() {
    try {
      const resposta = await buscaUsuarioPorId(usuarioId);
      setNomeUsuario(resposta.nome);
      setEmailUsuario(resposta.email);
      setTelefoneUsuario(resposta.telefone);
      setDataUsuario(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
    }
  }

  async function alterar() {
    try {
      // Validação dos campos usando suas funções de validação
      const mensagemErro = validarEditarDados(
        nome,
        email,
        data,
        telefone
      );

      if (mensagemErro) {
        throw new Error(mensagemErro);
      }

      if (userSenha !== confirmarSenha) {
        throw new Error("A senha digitada não corresponde à senha atual.");
      }

      // Chamada para alterar os dados
      const resultado = await alterarUsuario(
        usuarioId,
        nome,
        email,
        userSenha,
        confirmarSenha,
        data,
        telefone,
        userIdPlano,
        tipoPlanoUsuario,
        planoMensalUsuario,
        planoAnualUsuario,
      );

      if (resultado === "sucesso") {
        Alert.alert("Dados atualizados com sucesso!");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Chatbot' }],
          })
        );
      } else {
        // Feedback visual de erro
        Alert.alert("Erro ao atualizar os dados.");
      }
    } catch (error) {
      // Tratamento de erros
      Alert.alert("Erro", error.message);
    }
  }

  function formatarTelefone(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const ddd = value.slice(0, 2);
    const part1 = value.slice(2, 7);
    const part2 = value.slice(7, 11);

    // Formate o telefone como desejar
    let formattedPhone = `(${ddd}) ${part1}-${part2}`;

    setTelefoneUsuario(formattedPhone);
  }

  function formatarData(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    // Formate a data como desejar
    let formattedDate = `${year}-${month}-${day}`;

    setDataUsuario(formattedDate);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Header voltar/>
      <Modelo>
        <Texto style={estilos.titulo}>Meu perfil</Texto>
        <View style={estilos.conteiner}>
          <View style={estilos.informacoes}>
            <Texto style={estilos.tituloInfo}>Nome: </Texto>
            <TextInput
              placeholder="Nome do usuário"
              autoCapitalize="none"
              style={estilos.conteudo}
              value={nome}
              onChangeText={setNomeUsuario}
              placeholderTextColor="#000000"
            />
          </View>
          <View style={estilos.informacoes}>
            <Texto style={estilos.tituloInfo}>E-mail: </Texto>
            <TextInput
              placeholder="E-mail do usuário"
              autoCapitalize="none"
              style={estilos.conteudo}
              value={email}
              onChangeText={setEmailUsuario}
              multiline
              placeholderTextColor="#000000"
              ref={emailRef}
              onSubmitEditing={() => senhaRef.current.focus()}
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
              keyboardType='numeric'
              multiline
              placeholderTextColor="#000000"
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
              placeholderTextColor="#000000"
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
              placeholderTextColor="#000000"
              onSubmitEditing={() => nascimentoRef.current.focus()}
            />
          </View>
        </View>
        <TouchableOpacity style={estilos.botoes} onPress={alterar}>
          <Texto style={estilos.textos}>Editar Dados</Texto>
        </TouchableOpacity>
      </Modelo>
    </ScrollView>
  );
}
