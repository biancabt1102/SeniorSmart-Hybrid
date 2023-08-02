import React from "react";
import Home from "../Home";
import { ScrollView, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Texto from "../../components/Texto";
import { useNavigation } from "@react-navigation/native";
import { cadastrarUsuario as criarUsuario } from "../../services/requests/usuario";
import { criarPlano } from "../../services/requests/plano";

export default function PlanoComTeste({ route }) {
  const navigation = useNavigation();
  const planoAno = '378.00';
  const planoMes = '35.00';
  const usuario = route.params.usuario;
  let planoid = '';
  let tipoPlano = '';
  let planoMensal = null;
  let planoAnual = null;

  async function cadastrarPlano(plano, mensal, anual) {
    const resultado = await criarPlano(
      plano,
      mensal,
      anual
    )

    if (resultado != null) {
      planoid = resultado;
      cadastrarUsuario(planoid, plano, mensal, anual)
  } else {
      Alert.alert('Erro ao Cadastrar!')
  }
  }

  async function cadastrarUsuario(planoid, plano, mensal, anual) {
    const resultado = await criarUsuario(
        route.params.usuario,
        route.params.emailUsuario,
        route.params.senhaUsuario,
        route.params.confirmarSenhaUsuario,
        route.params.nascimentoUsuario,
        route.params.telefoneUsuario,
        planoid,
        plano,
        mensal,
        anual
    )

    if (resultado === 'sucesso') {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } else {
        Alert.alert('Erro ao Cadastrar!')
    }
  }

  async function criar(tipoPlano, planoMensal, planoAnual) {
    if (tipoPlano === "Teste Gratis") {
      Alert.alert("Plano Grátis!");
      cadastrarPlano(tipoPlano, planoMensal, planoAnual);
      navigation.navigate("Contratado", {
        //tipo: tipoPlano,
        //mensal: planoMensal,
        //anual: planoAnual,
        usuario: usuario});
    } else if (tipoPlano === "Anual") {
      Alert.alert("Plano Anual!");
      cadastrarPlano(tipoPlano, planoMensal, planoAnual);
      navigation.navigate("Modelo", { 
        preco: planoAnual,
        tipo: tipoPlano, 
        mensal: planoMensal,
        anual: planoAnual, 
        usuario: route.params,
        planoid: planoid,
        screen: 'Pagamento'});
    } else if (tipoPlano === "Mensal") {
      Alert.alert("Plano Mensal!");
      cadastrarPlano(tipoPlano, planoMensal, planoAnual);
      navigation.navigate("Modelo", { 
        preco: planoMensal,
        tipo: tipoPlano, 
        mensal: planoMensal,
        anual: planoAnual,
        planoid: planoid,
        usuario: route.params, 
        screen: 'Pagamento'});
    }
  }

  const texto =
    "    Bem-vindo a Sexta-Feira, o nosso chat bot que irá facilitar sua vida tecnológica! Com linguagem simples e amigável, o Marcelo está aqui para ajudá-lo a realizar tarefas como instalar aplicativos, enviar e-mails e muito mais. Sinta-se à vontade para perguntar o que quiser e deixe o Marcelo guiá-lo rumo ao sucesso tecnológico!";
  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Home continuacao={false} conteudo={texto} />
      <View style={estilos.pai}>
        <Texto style={estilos.titulo}>Os melhores planos para você:</Texto>
        <View style={estilos.opcao}>
          <Texto style={estilos.planos}>Teste gratuito:</Texto>
          <Texto style={estilos.precos}>R$00,00</Texto>
          <TouchableOpacity
            onPress={() => criar("Teste Gratis", null, null)}
            style={estilos.botoes}
          >
            <Texto style={estilos.textos}>Contratar</Texto>
          </TouchableOpacity>
        </View>
        <View style={estilos.opcao}>
          <Texto style={estilos.planos}>Plano anual:</Texto>
          <Texto style={estilos.precos}>R$378,00</Texto>
          <TouchableOpacity
            onPress={() => criar("Anual", null, planoAno)}
            style={estilos.botoes}
          >
            <Texto style={estilos.textos}>Contratar</Texto>
          </TouchableOpacity>
        </View>
        <View style={estilos.opcao}>
          <Texto style={estilos.planos}>Plano mensal:</Texto>
          <Texto style={estilos.precos}>R$35,00</Texto>
          <TouchableOpacity
            onPress={() => criar("Mensal", planoMes, null)}
            style={estilos.botoes}
          >
            <Texto style={estilos.textos}>Contratar</Texto>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E4D0D0'
  },
  pai: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#867070",
    marginHorizontal: 16,
    marginBottom: 31,
    borderRadius: 20
  },
  titulo: {
    textAlign: "center",
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "700",
    color: "#F5EBEB",
    marginHorizontal: 5,
    marginTop: 18,
    marginBottom: 12
  },
  opcao: {
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: '#E4D0D0',
    borderRadius: 30,
    marginTop: 19
  },
  planos: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '400',
    color: '#000000',
    marginTop: 4
  },
  precos: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    color: '#483E3E',
    marginVertical: 16
  },
  botoes: {
    backgroundColor: "#867070",
    paddingHorizontal: 50,
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
    marginBottom: 14,
    marginHorizontal: 45
  },
  textos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
