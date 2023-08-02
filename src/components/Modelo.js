import React from "react";
import Header from "./Header";
import { View, StyleSheet } from "react-native";
import Pagamento from "../screens/Pagamento";
import Perfil from "../screens/Perfil";
import EditarDados from "../screens/EditarDados";
import EditarCartao from "../screens/EditarCartao";
import MudarSenha from "../screens/MudarSenha";
import ExcluirConta from "../screens/ExcluirConta";
import SairConta from "../screens/SairConta";

export default function Modelo({ route }) {
  const { screen } = route.params;
  let Component = null;
  let estadoPerfil = true;

  if (screen === 'Pagamento') {
    Component = Pagamento;
    estadoPerfil = false;
  } else if (screen === 'Perfil') {
    Component = Perfil;
  } else if (screen === 'EditarDados') {
    Component = EditarDados;
  } else if (screen === 'EditarCartao') {
    Component = EditarCartao;
  } else if (screen === 'MudarSenha') {
    Component = MudarSenha;
  } else if (screen === 'ExcluirConta') {
    Component = ExcluirConta;
  } else if (screen === 'SairConta') {
    Component = SairConta;
  }

  return (
    <>
        <Header voltar={true} perfil={estadoPerfil}/>
        <View style={estilos.pai}>
            <View style={estilos.filho}>
                {Component && <Component route={route} />}
            </View>
        </View>
    </>
  );
}

const estilos = StyleSheet.create({
  pai: {
    backgroundColor: "#E4D0D0",
  },
  filho: {
    marginHorizontal: 11,
    marginVertical: 19,
    backgroundColor: "#F5EBEB",
    borderRadius: 10,
    height: "90.5%",
  },
});
