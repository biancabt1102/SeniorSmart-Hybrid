import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import Header from "../../components/Header";
import Texto from "../../components/Texto";
import { criarPlano } from "../../services/requests/plano";
import { cadastrarUsuario as criarUsuario } from "../../services/requests/usuario";
import estilos from "./styles";
import Home from "../Home";

export default function PlanoComTeste({ route }) {
  const navigation = useNavigation();
  const planoAno = '521.04';
  const planoMes = '43.42';

  // Obtém o contexto
  const { userIdPlano, updateAuthState } = useContext(AuthContext);

  // Função para cadastrar um plano e em seguida o usuário
  async function cadastrarPlanoEUsuario(tipoPlano, planoMensal, planoAnual) {
    const resultadoPlano = await criarPlano(tipoPlano, planoMensal, planoAnual);

    if (resultadoPlano != null) {
      updateAuthState({ userIdPlano : resultadoPlano });
      cadastrarUsuario(resultadoPlano, tipoPlano, planoMensal, planoAnual);
    } else {
      Alert.alert('Erro ao Cadastrar!');
    }
  }

  // Função para cadastrar um usuário
  async function cadastrarUsuario(planoid, tipoPlano, planoMensal, planoAnual) {
    const {
      usuario,
      emailUsuario,
      senhaUsuario,
      confirmarSenhaUsuario,
      nascimentoUsuario,
      telefoneUsuario,
    } = route.params;

    const resultadoUsuario = await criarUsuario(
      usuario,
      emailUsuario,
      senhaUsuario,
      confirmarSenhaUsuario,
      nascimentoUsuario,
      telefoneUsuario,
      planoid,
      tipoPlano,
      planoMensal,
      planoAnual
    );

    if (resultadoUsuario != null) {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } else {
      Alert.alert('Erro ao Cadastrar!');
    }
  }

  // Função para criar o plano e navegar para a próxima tela
  function criarPlanoETela(tipoPlano, planoMensal, planoAnual) {
    cadastrarPlanoEUsuario(tipoPlano, planoMensal, planoAnual);

    if (tipoPlano === "Teste Gratis") {
      Alert.alert("Plano Grátis!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Contrato' }],
        })
      );
    } else if (tipoPlano === "Anual") {
      Alert.alert("Plano Anual!");
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Pagamento', 
                    params: { planoid: userIdPlano, preco: planoAnual} }],
        })
      );

    } else if (tipoPlano === "Mensal") {
      Alert.alert("Plano Mensal!");

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Pagamento', 
                    params: { planoid: userIdPlano, preco: planoMensal} }],
        })
      );
    }
  }

  const texto =
    "    Bem-vindo a Sexta-Feira, o nosso chat bot que irá facilitar sua vida tecnológica! Com linguagem simples e amigável, o Marcelo está aqui para ajudá-lo a realizar tarefas como instalar aplicativos, enviar e-mails e muito mais. Sinta-se à vontade para perguntar o que quiser e deixe o Marcelo guiá-lo rumo ao sucesso tecnológico!";

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Home continuacao={false} conteudo={texto} voltar/>
      <View style={estilos.pai}>
        <Texto style={estilos.titulo}>Os melhores planos para você:</Texto>
        {renderPlano("Teste Gratis", null, null)}
        {renderPlano("Anual", null, planoAno)}
        {renderPlano("Mensal", planoMes, null)}
      </View>
    </ScrollView>
  );

  // Função para renderizar um plano com botão Contratar
  function renderPlano(tipoPlano, planoMensal, planoAnual) {
    return (
      <View style={estilos.opcao}>
        <Texto style={estilos.planos}>{tipoPlano}:</Texto>
        <Texto style={estilos.precos}>
          {tipoPlano === "Teste Gratis" ? "R$00,00" : tipoPlano === "Anual" ? `R$${planoAnual}` : `R$${planoMensal}`}
        </Texto>
        <TouchableOpacity
          onPress={() => criarPlanoETela(tipoPlano, planoMensal, planoAnual)}
          style={estilos.botoes}
        >
          <Texto style={estilos.textos}>Contratar</Texto>
        </TouchableOpacity>
      </View>
    );
  }
}
