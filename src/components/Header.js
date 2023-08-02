import React, { useContext } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import cabecinha from "../assets/cabecinhaHeader.png"
import Texto from "./Texto";
import setaVolta  from "../assets/setaVolta.png";
import { useNavigation } from "@react-navigation/native";
import AuthContext from './AuthContext';

export default function Header({ titulo = 'SeniorSmart', voltar = false, cabeca = true, estilo = estilos.titulo}) {
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);
    let navegacao = ''

    if (isLoggedIn === true) {
      navegacao = () => navigation.navigate("Modelo", {screen: 'Perfil'})
    } else {
      navegacao = () => navigation.navigate("Invalido")
    }

    return (
      <View style={estilos.header}>
        {voltar && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={setaVolta} accessibilityRole="image" />
          </TouchableOpacity>
        )}
        <Texto style={estilo}>{titulo}</Texto>
        {cabeca && (
          <TouchableOpacity onPress={navegacao}>
            <Image source={cabecinha} accessibilityRole="image" />
          </TouchableOpacity>
        )}
      </View>
    );
}

const estilos = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        backgroundColor: '#867070',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    titulo: {
        fontSize: 14,
        color: '#F5EBEB',
        fontWeight: '900',
        lineHeight: 24,
    }
});
