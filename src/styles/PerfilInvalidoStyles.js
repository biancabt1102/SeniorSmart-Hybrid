import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#E4D0D0',
    height: '100%',
  },
  content: {
    justifyContent: 'center',
    marginVertical: '55%',
    backgroundColor: '#F5EBEB',
    marginHorizontal: 14,
    paddingHorizontal: 13,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: 'black',
  },
  texto: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: '700',
    color: '#483E3E',
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  button: {
    backgroundColor: '#867070',
    paddingHorizontal: 50,
    paddingVertical: 7,
    color: '#FFFFFF',
    borderRadius: 20,
    textAlign: 'center',
  },
  separator: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 8,
    color: '#867070',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default estilos;
