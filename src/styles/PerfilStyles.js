import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    titulo: {
      fontSize: 24,
      lineHeight: 29,
      fontWeight: '700',
      color: '#483E3E',
      textAlign: 'center',
      marginTop: 17,
      marginBottom: 39,
    },
    container: {
      marginHorizontal: 25,
      marginBottom: 45,
      borderWidth: 1,
      borderColor: '#483E3E',
      paddingHorizontal: 11,
      paddingTop: 11,
    },
    informacao: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    tituloInfo: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '400',
      color: '#483E3E',
    },
    conteudo: {
      borderWidth: 1,
      borderColor: '#A6AEB3',
      paddingVertical: 3,
      paddingHorizontal: 11,
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '400',
      color: '#000000',
    },
    botao: {
      backgroundColor: "#867070",
      paddingVertical: 7,
      borderRadius: 20,
      alignItems: "center",
      marginBottom: 14,
      marginHorizontal: 105,
    },
    textoBotao: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "400",
    },
  });

  export default estilos;