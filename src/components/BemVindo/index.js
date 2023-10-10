import React from "react";
import { Image, View } from "react-native";
import logo from '../../assets/logo.png';
import BemVindoStyles from "./styles";
import BemVindoContent from "./components/Content";
import BemVindoLema from "./components/Lema";

export default function BemVindo({ conteudo = null, continuacao = true }) {
  return (
    <>
      <View style={BemVindoStyles.bemVindo}>
        <Image source={logo} accessibilityLabel="Uma CPU com monitor. Logo da SeniorSmart" />
        <BemVindoLema />
      </View>
      <BemVindoContent conteudo = {conteudo} continuacao = {continuacao}/>
    </>
  );
}
