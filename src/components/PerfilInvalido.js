import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import estilos from "../styles/PerfilInvalidoStyles";
import Header from "./Header";
import Texto from "./Texto";

export default function PerfilInvalido() {
    const navigation = useNavigation();

    return (
        <View style={estilos.container}>
            <Header voltar={true} />
            <View style={estilos.content}>
                <Texto style={estilos.texto}>
                    Por favor, faça login ou crie uma conta para continuar.
                </Texto>
                <View style={estilos.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Cadastro');
                        }}
                        style={estilos.button}
                    >
                        <Texto style={estilos.buttonText}>Criar conta</Texto>
                    </TouchableOpacity>
                    <Texto style={estilos.separator}>ou</Texto>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                        style={estilos.button}
                    >
                        <Texto style={estilos.buttonText}>Realizar login</Texto>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}