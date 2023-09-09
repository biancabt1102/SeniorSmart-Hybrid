import React from "react";
import { View } from "react-native";
import estilos from "../styles/ModeloStyles";

export default function Modelo({ children }) {
  return (
    <>
        <View style={estilos.pai}>
            <View style={estilos.filho}>
                {children}
            </View>
        </View>
    </>
  );
}
