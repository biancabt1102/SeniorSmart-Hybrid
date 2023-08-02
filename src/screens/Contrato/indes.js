import React from "react";
import Home from "../Home";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Texto from "../../components/Texto";
import { useNavigation } from "@react-navigation/native";

export default function Contrato({ route }) {
    const navigation = useNavigation();
    const usuario = route.params.usuario;
    const conteudo = "    Parabéns! Você acaba de adquirir um dos nossos planos e agora tem acesso ilimitado a todas as funcionalidades do nosso chat bot. Estamos aqui para ajudá-lo em suas tarefas tecnológicas e tornar sua experiência ainda mais agradável. Conte conosco para descomplicar a tecnologia e facilitar sua vida. Obrigado por fazer parte da nossa comunidade!";

    return <View style={estilos.container}>
            <Home conteudo={conteudo} continuacao={false}/>
            <TouchableOpacity
                onPress={() => {navigation.navigate('Entrar', {tipo: route.params.tipo, usuario: usuario})}}
                style={estilos.botoes}
            >
                <Texto style={estilos.textos}>Faça Login</Texto>
            </TouchableOpacity>
    </View>
}

const estilos = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#E4D0D0',  
    },
    botoes: {
        backgroundColor: "#867070",
        paddingHorizontal: 50,
        paddingVertical: 7,
        color: "#FFFFFF",
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 14,
        marginHorizontal: 45,
        marginBottom: '50%',
        marginHorizontal: 80
    },
    textos: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "400",
    },
});