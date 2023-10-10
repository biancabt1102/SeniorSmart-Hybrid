import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import cabecinha from "../assets/cabecinhaHeader.png";
import setaVolta from "../assets/setaVolta.png";
import HeaderStyles from "../styles/HeaderStyles";
import AuthContext from "./AuthContext";
import Texto from "./Texto";

export default function Header({ titulo = 'SeniorSmart', voltar = false, cabeca = true, estilo = HeaderStyles.titulo, children }) {
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);

  // Função para voltar para a tela anterior
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Função para lidar com a navegação ao tocar na cabeça (se o usuário estiver logado) ou navegar para uma tela de perfil inválido
  const handleNavigation = () => {
    if (isLoggedIn) {
      navigation.navigate("Perfil");
    } else {
      navigation.navigate("Invalido");
    }
  };

  return (
    <View style={HeaderStyles.header}>
      {children}
      {voltar && (
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={setaVolta} accessibilityRole="image" />
        </TouchableOpacity>
      )}
      <Texto style={estilo}>{titulo}</Texto>
      {cabeca && (
        <TouchableOpacity onPress={handleNavigation}>
          <Image source={cabecinha} accessibilityRole="image" />
        </TouchableOpacity>
      )}
    </View>
  );
}
