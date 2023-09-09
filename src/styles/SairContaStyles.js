import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 20,
        lineHeight: 24,
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
  

  export default estilos;
  