import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    tituloPreco: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: "700",
        color: "#000000",
        marginTop: 10,
        marginLeft: 19,
      },
      preco: {
        textAlign: "center",
        fontSize: 24,
        lineHeight: 34,
        fontWeight: "400",
        color: "#000000",
        marginTop: 20,
        marginBottom: 50,
      },
      tituloDados: {
        fontSize: 20,
        lineHeight: 30,
        fontWeight: "700",
        color: "#000000",
        marginBottom: 18,
        marginLeft: 19,
      },
      dados: {
        marginHorizontal: 33,
        marginBottom: 77,
      },
      titulos: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      informacoes: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      nomes: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "400",
        color: "#000000",
      },
      validade: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "400",
        color: "#000000",
        width: "50%",
      },
      cvv: {
        fontSize: 15,
        lineHeight: 18,
        fontWeight: "400",
        color: "#000000",
        width: "45%",
      },
      campos: {
        fontSize: 16,
        fontWeight: "400",
        color: "#FFFFFF",
        backgroundColor: "#867070",
        borderRadius: 5,
        marginBottom: 21,
        paddingLeft: 10
      },
      informacoesCampos: {
        fontSize: 14,
        fontWeight: "400",
        color: "#FFFFFF",
        backgroundColor: "#867070",
        borderRadius: 5,
        marginBottom: 21,
        width: "45%",
        paddingLeft: 10
      },
      botoes: {
        backgroundColor: "#867070",
        paddingHorizontal: 50,
        paddingVertical: 7,
        color: "#FFFFFF",
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 14,
        marginHorizontal: 45,
        marginBottom: "50%",
        marginHorizontal: 80,
      },
      textos: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "400",
      }
});

export default estilos;
