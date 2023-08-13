import React, { useContext, useEffect } from "react";
import { TouchableOpacity, ScrollView, View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Texto from "../../components/Texto";
import BemVindo from "../../components/BemVindo";
import { useNavigation } from "@react-navigation/native";
import AuthContext from '../../components/AuthContext';


export default function Home({ conteudo = null, continuacao = true}) {
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if(isLoggedIn) {
            navigation.navigate('Chatbot')
        }
    }, []);

    return <ScrollView>
        <Header/>
        <BemVindo conteudo={conteudo} continuacao={continuacao}/>
        {!!continuacao === true && <View style={ estilos.conteudo }>
            <TouchableOpacity onPress={() => { navigation.navigate('Entrar', {screen: 'Cadastro'}) }} style={ estilos.botoes }>
                <Texto style={ estilos.textos }>  Criar conta  </Texto>
            </TouchableOpacity>
            <Texto style={ estilos.separacao }>ou</Texto>
            <TouchableOpacity onPress={() => { navigation.navigate('Entrar', {screen: 'Login'}) }} style={ estilos.botoes }>
                <Texto style={ estilos.textos }>Realizar login</Texto>
            </TouchableOpacity>
        </View>}
    </ScrollView>
}

const estilos = StyleSheet.create({
    conteudo: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#F5EBEB'
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