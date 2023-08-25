import React, { useContext, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Modal } from "react-native";
import cabecinha from "../assets/cabecinhaHeader.png"
import Texto from "./Texto";
import setaVolta  from "../assets/setaVolta.png";
import configuration from "../assets/config.png";
import { useNavigation } from "@react-navigation/native";
import AuthContext from './AuthContext';

export default function Header({ titulo = 'SeniorSmart', voltar = false, cabeca = true, estilo = estilos.titulo, config = false }) {
    const navigation = useNavigation();
    const { isLoggedIn, setVozVirtual } = useContext(AuthContext);
    let navegacao = ''

    if (isLoggedIn === true) {
      navegacao = () => navigation.navigate("Modelo", { screen: 'Perfil' });
    } else {
      navegacao = () => navigation.navigate("Invalido");
    }

    const [configVisible, setConfigVisible] = useState(false);

    const toggleConfig = () => {
      setConfigVisible(!configVisible);
    }

    return (
      <View style={estilos.header}>
        {voltar && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={setaVolta} accessibilityRole="image" />
          </TouchableOpacity>
        )}
        {config && (
          <TouchableOpacity onPress={toggleConfig}>
            <Image source={configuration} accessibilityRole="image" style={estilos.config}/>
          </TouchableOpacity>
        )}
        <Texto style={estilo}>{titulo}</Texto>
        {cabeca && (
          <TouchableOpacity onPress={navegacao}>
            <Image source={cabecinha} accessibilityRole="image" />
          </TouchableOpacity>
        )}

        {/* Configuração do modal */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={configVisible}
        onRequestClose={toggleConfig}
        >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Texto>Selecione a velocidade da fala:</Texto>
            <TouchableOpacity onPress={() => setVozVirtual(10000)}>
              <Texto>Lento</Texto>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVozVirtual(5000)}>
              <Texto>Médio</Texto>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVozVirtual(2000)}>
              <Texto>Rápido</Texto>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      </View>
    );
}

const estilos = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        backgroundColor: '#867070',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    titulo: {
        fontSize: 14,
        color: '#F5EBEB',
        fontWeight: '900',
        lineHeight: 24,
    },
    config: {
      height: 40,
      width: 40
    }, 
    modalContainer: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
});
