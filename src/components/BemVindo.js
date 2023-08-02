import React from "react";
import { Image, StyleSheet, View, ViewBase } from "react-native";
import logo from "../assets/logo.png" 
import Texto from "./Texto";

export default function BemVindo({ conteudo = null, continuacao = true }) {
    if (conteudo === null) {
        conteudo = "    Bem-vindo ao nosso chat bot! Aqui, você encontrará ajuda para tarefas básicas de tecnologia. Nosso objetivo é tornar a tecnologia mais acessível para todos, especialmente para a terceira idade. Sabemos que nem sempre é fácil lidar com smartphones, computadores e outros dispositivos tecnológicos, mas estamos aqui para ajudá-lo. Com o nosso chat bot, você aprenderá a instalar aplicativos, enviar e-mails, acessar redes sociais e muito mais! Nossa linguagem é simples e amigável, para que você se sinta confortável em cada passo do caminho. Não importa qual seja a sua dúvida, estaremos sempre à disposição para ajudar.";
    }
    return <>
        <View style={estilos.bemVindo}>
            <Image source={logo} accessibilityLabel="Uma CPU com monitor. Logo da SeniorSmart"/>
            <Texto style={ estilos.lema }>A tecnologia não precisa ser complicada - deixe nosso chatbot mostrar como é fácil!</Texto>
        </View>
        <View style={ estilos.conteudo }> 
            <Texto style={ estilos.texto }>{ conteudo }</Texto>
            {!!continuacao === true && <Texto style={ estilos.titulo }>Teste grátis</Texto>}
            {!!continuacao === true && <Texto style={ estilos.texto }>    Temos uma ótima notícia para você! Nosso chat bot oferece um plano mensal por apenas R$35, e um plano anual com um desconto ainda maior, por R$378. Com qualquer um dos planos, você terá acesso a todas as funcionalidades do nosso chat bot, além de suporte técnico por e-mail.
            E para que você possa experimentar nosso chat bot sem compromisso, oferecemos um teste gratuito de 1 semana para novos usuários. Isso mesmo, você pode testar nossas funcionalidades e aprender novas habilidades tecnológicas sem gastar um centavo.
            Acreditamos que a tecnologia deve estar ao alcance de todos, e é por isso que nossos planos são acessíveis e nossas orientações são fáceis de seguir. Com a ajuda do nosso chat bot, você poderá desfrutar de todas as vantagens da tecnologia de maneira descomplicada.
            Não perca mais tempo, experimente nosso chat bot e descubra como a tecnologia pode tornar sua vida mais fácil.</Texto>}
        </View>
    </>
}

const estilos = StyleSheet.create({
    bemVindo: {
        alignItems: 'center',
        backgroundColor: '#F5EBEB'
    }, 
    lema: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        color: '#867070',
        marginBottom: 22,
        lineHeight: 29
    },
    conteudo: {
        paddingTop: 10,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#E4D0D0'
    },
    texto: {
        fontSize: 20,
        fontWeight: '400',
        color: '#000',
        lineHeight: 24,
        marginBottom: 31
    },
    titulo: {
        fontSize: 20,
        fontWeight: '900'
    }
});