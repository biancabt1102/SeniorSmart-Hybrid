import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import Texto from "./Texto";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";


export default function PerfilInvalido() {
    const navigation = useNavigation();

    return <View style={ estilos.avo }>
        <Header voltar={ true }/>
        <View style={ estilos.pai }>
            <Texto style={ estilos.texto }>Por favor, faça login ou crie uma conta para continuar.</Texto>
            <View style={ estilos.conteudo }>
                <TouchableOpacity onPress={() => { navigation.navigate('Entrar', {screen: 'Cadastro'}) }} style={ estilos.botoes }>
                    <Texto style={ estilos.textos }>  Criar conta  </Texto>
                </TouchableOpacity>
                <Texto style={ estilos.separacao }>ou</Texto>
                <TouchableOpacity onPress={() => { navigation.navigate('Entrar', {screen: 'Login'}) }} style={ estilos.botoes }>
                    <Texto style={ estilos.textos }>Realizar login</Texto>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}

const estilos = StyleSheet.create({
    avo: {
       backgroundColor: '#E4D0D0',
       height: "100%" 

    },
    pai: {
        justifyContent: 'center',
        marginVertical: "55%",
        backgroundColor: '#F5EBEB',
        marginHorizontal: 14,
        paddingHorizontal: 13,
        paddingVertical: 18,
        borderWidth: 1, 
        borderColor: 'black'
    },
    texto: {
        fontSize: 24,
        lineHeight: 29,
        fontWeight: "700",
        color: '#483E3E',
        textAlign: 'center'
    },
    conteudo: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    botoes: {
        backgroundColor: '#867070',
        paddingHorizontal: 50,
        paddingVertical: 7,
        color: '#FFFFFF',
        borderRadius: 20,
        textAlign: 'center'
    },
    separacao: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
        color: '#867070'
    },
    textos: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    }
});