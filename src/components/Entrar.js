import React from "react";
import logo from '../assets/logo.png'
import { View, Image, StyleSheet } from "react-native";
import Cadastro from "../screens/Cadastro";
import Login from "../screens/Login";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Entrar({ route }) {
    const { screen } = route.params;
    const Componet = screen === 'Cadastro' ? Cadastro : Login; 

    return <KeyboardAwareScrollView contentContainerStyle={estilos.container}>
                <View style={estilos.pai}>
                    <View style={estilos.filho}>
                        <Image source={logo} style={estilos.logo}/>
                        <Componet/>
                    </View>
                </View>
    </KeyboardAwareScrollView>
}

const estilos = StyleSheet.create({
    container: {
        flexGrow: 1,
      },
    pai: {
        backgroundColor: '#E4D0D0'
    },
    filho: {
        height: "94.5%",
        marginHorizontal: 26,
        marginVertical: 23,
        backgroundColor: '#F5EBEB',
        borderRadius: 20,
        alignItems: 'center'
    },
    logo: {
        marginTop: 41
    }
});