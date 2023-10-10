import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E4D0D0',
  },
  pai: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#867070",
    marginHorizontal: 16,
    marginBottom: 31,
    borderRadius: 20,
  },
  titulo: {
    textAlign: "center",
    fontSize: 32,
    lineHeight: 39,
    fontWeight: "700",
    color: "#F5EBEB",
    marginHorizontal: 5,
    marginTop: 18,
    marginBottom: 12,
  },
  opcao: {
    marginBottom: 16,
    alignItems: "center",
    backgroundColor: '#E4D0D0',
    borderRadius: 30,
    marginTop: 19,
  },
  planos: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '400',
    color: '#000000',
    marginTop: 4,
  },
  precos: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400',
    color: '#483E3E',
    marginVertical: 16,
  },
  botoes: {
    backgroundColor: "#867070",
    paddingHorizontal: 50,
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
    marginBottom: 14,
    marginHorizontal: 45,
  },
  textos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});

export default estilos;
