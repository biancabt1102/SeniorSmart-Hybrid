import React from "react";
import { View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import estilos from "../styles/EntradaStyles";
import logo from "../assets/logo.png";

// Definição do componente Entrar, que recebe children como propriedade
export default function Entrada({ children }) { 
    return (
        <KeyboardAwareScrollView contentContainerStyle={estilos.container}>
            <View style={estilos.pai}>
                <View style={estilos.filho}>
                    <Image source={logo} style={estilos.logo}/>
                    {children}
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
