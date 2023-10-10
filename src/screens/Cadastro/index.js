import { useNavigation } from "@react-navigation/native";
import React, { useContext, useRef, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import Entrada from "../../components/Entrada";
import Texto from "../../components/Texto";
import { validarCampos } from "../../components/ValidacoesUsuario";
import estilos from "./styles"; // Importe os estilos
import Header from "../../components/Header";
import { buscaUsuarioEmail } from "../../services/requests/usuario";

export default function Cadastro() {
  // Use o destructuring para melhorar a legibilidade do código
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const { updateAuthState } = useContext(AuthContext);
  const [confirmarSenhaUsuario, setConfirmarSenhaUsuario] = useState('');
  const [nascimentoUsuario, setNascimentoUsuario] = useState('');
  const [telefoneUsuario, setTelefoneUsuario] = useState('');
  const navigation = useNavigation();

  const emailRef = useRef();
  const senhaRef = useRef();
  const confirmarSenhaRef = useRef();
  const nascimentoRef = useRef();

  // Função para mostrar mensagens de erro
  const mostrarErro = (mensagem) => {
    Alert.alert('Erro', mensagem);
  };

  // Função para tratar o cadastro
  const handleCadastro = async () => {
    updateAuthState({
      userSenha: senhaUsuario});
    const erro = validarCampos(
        nomeUsuario,
        emailUsuario,
        senhaUsuario,
        confirmarSenhaUsuario,
        nascimentoUsuario,
        telefoneUsuario
      );

      if (!erro) {
        const usuarioExistente = await buscaUsuarioEmail(emailUsuario);

        if (usuarioExistente) {
          mostrarErro("Email já cadastrado. Por favor, escolha outro email.");
        } else {
          navigation.navigate("PlanoComTeste", {
            usuario: nomeUsuario,
            emailUsuario: emailUsuario,
            senhaUsuario: senhaUsuario,
            confirmarSenhaUsuario: confirmarSenhaUsuario,
            nascimentoUsuario: nascimentoUsuario,
            telefoneUsuario: telefoneUsuario,
          });
        }
      } else {
        mostrarErro(erro);
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
      <Header voltar="true"/>
      <Entrada>
        <View style={estilos.cadastro}>
          {/* Componentes de entrada para o formulário */}
          <TextInput
            placeholder="Nome"
            autoCapitalize="none"
            style={estilos.campos}
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
            placeholderTextColor="#000000"
          />
          <TextInput
            placeholder="E-mail"
            autoCapitalize="none"
            style={estilos.campos}
            value={emailUsuario}
            onChangeText={setEmailUsuario}
            placeholderTextColor="#000000"
            ref={emailRef}
            onSubmitEditing={() => senhaRef.current.focus()}
          />
          <TextInput
            placeholder="Senha"
            autoCapitalize="none"
            style={estilos.campos}
            secureTextEntry
            value={senhaUsuario}
            onChangeText={setSenhaUsuario}
            placeholderTextColor="#000000"
            ref={senhaRef}
            onSubmitEditing={() => confirmarSenhaRef.current.focus()}
          />
          <TextInput
            placeholder="Confirmar a senha"
            autoCapitalize="none"
            style={estilos.campos}
            secureTextEntry
            value={confirmarSenhaUsuario}
            onChangeText={setConfirmarSenhaUsuario}
            placeholderTextColor="#000000"
            ref={confirmarSenhaRef}
            onSubmitEditing={() => nascimentoRef.current.focus()}
          />
          <TextInput
            placeholder="Nascimento (ano-mês-dia)"
            autoCapitalize="none"
            style={estilos.campos}
            value={nascimentoUsuario}
            keyboardType='numeric'
            onChangeText={formatarData}
            placeholderTextColor="#000000"
          />
          
          <TextInput
            placeholder="Telefone (11) 12345-6789"
            autoCapitalize="none"
            style={estilos.campos}
            keyboardType='numeric'
            value={telefoneUsuario}
            onChangeText={formatarTelefone}
            placeholderTextColor="#000000"
          />
          
        </View>
        {/* Botão de cadastro */}
        <TouchableOpacity style={estilos.botao} onPress={handleCadastro}>
          <Texto style={estilos.textoBotao}>Cadastrar-se</Texto>
        </TouchableOpacity>
      </Entrada>
    </>
  );
}