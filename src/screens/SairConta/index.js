import React, { useContext } from "react";
import Texto from "../../components/Texto"
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../components/AuthContext"; // Importe o AuthContext


export default function SairConta() {
    const navigation = useNavigation();
    const { setIsLoggedIn } = useContext(AuthContext);

    function sair() {
        setIsLoggedIn(false);
        navigation.navigate('Home');
    }

    return <View style={estilos.container}>
        <Texto style={estilos.titulo}>Deseja sair da conta?</Texto>
        <View style={estilos.opcoes}>
            <TouchableOpacity style={estilos.botoes} onPress={() => sair()}>
                <Texto style={estilos.textos}>Sim</Texto>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botoes} onPress={() => navigation.goBack()}>
                <Texto style={estilos.textos}>Não</Texto>
            </TouchableOpacity>
        </View>
    </View>
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 20,
        lineHeight: 24, 
        fontWeight: 700,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 37
    },
    opcoes: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    botoes: {
      backgroundColor: "#867070",
      paddingVertical: 7,
      color: "#FFFFFF",
      borderRadius: 20,
      textAlign: "center",
      alignItems: "center",
      marginHorizontal: 20,
      paddingHorizontal: 30
    },
    textos: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "400",
    },
  });
  