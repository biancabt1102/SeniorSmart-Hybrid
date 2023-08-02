import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Texto( { children, style } ) {
    let estilo = estilos.textoRegular;
    if (style?.fontWeight === '700') {
        estilo = estilos.textoBold;
    } else if (style?.fontWeight === '900') {
        estilo = estilos.textoBlack;
    }
    return <Text style={[style, estilo]}>{ children }</Text>
}

var estilos = StyleSheet.create({
    textoRegular: {
        fontFamily:'Overlock-Regular',
        fontWeight: "normal",
    },
    textoBold: {
        fontFamily: 'Overlock-Bold',
        fontWeight: "normal",
    },
    textoBlack: {
        fontFamily: 'Overlock-Black',
        fontWeight: "normal",
    }
});