import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import Header from "../../components/Header";
import Modelo from "../../components/Modelo";
import Texto from "../../components/Texto";
import estilos from "./styles";
estilos

export default function SaidaDaConta() {
    const navigation = useNavigation();
    const { setIsLoggedIn } = useContext(AuthContext);

    function sair() {
        setIsLoggedIn(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }] // Troque 'Home' pelo nome da sua tela inicial
        });
    }

    return(
        <>
        <Header/>
        <Modelo>
            <View style={estilos.container}>
            <Texto style={estilos.titulo}>Deseja sair da conta?</Texto>
            <View style={estilos.opcoes}>
            <TouchableOpacity style={estilos.botoes} onPress={() => {sair()}}>
                <Texto style={estilos.textos}>Sim</Texto>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.botoes} onPress={() => {navigation.goBack()}}>
                <Texto style={estilos.textos}>Não</Texto>
            </TouchableOpacity>
                </View>
            </View>
        </Modelo>
    </>
    ) 
    
}