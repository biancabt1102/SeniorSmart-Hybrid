import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5EBEB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      height: 40,
      backgroundColor: '#867070',
      alignItems: 'center',
      paddingHorizontal: 18,
    },
    titulo: {
      fontSize: 14,
      color: '#F5EBEB',
      fontWeight: '900',
      lineHeight: 24,
      backgroundColor: '#867070',
    },
    config: {
      height: 40,
      width: 40,
    },
    mensagemContainer: {
      padding: 8,
      borderRadius: 10,
      marginTop: 30,
      minHeight: 90,
      marginLeft: 14,
      marginRight: 14,
    },
    mensagemUsuario: {
      alignSelf: 'flex-end',
      width: '70%',
      backgroundColor: '#867070',
      marginLeft: 'auto',
    },
    mensagemChatbot: {
      alignSelf: 'flex-start',
      width: '70%',
      backgroundColor: '#E4D0D0',
      marginRight: 'auto',
    },
    mensagemContent: {
      flex: 1,
      fontSize: 15,
      lineHeight: 18,
      fontWeight: '400',
      textAlign: 'justify',
    },
    mensagemTextUsuario: {
      color: '#FFFFFF',
    },
    mensagemTextChatbot: {
      color: '#000000',
    },
    mensagemAutor: {
      fontWeight: '400',
      fontSize: 15,
      lineHeight: 18,
    },
    mensagemAutorUsuario: {
      alignSelf: 'flex-end',
      color: '#E4D0D0',
    },
    mensagemAutorChatbot: {
      alignSelf: 'flex-end',
      color: '#867070',
    },
    inputContainer: {
      flexDirection: 'row',
      marginTop: 16,
    },
    input: {
      flex: 1,
      marginRight: 8,
      borderWidth: 1,
      padding: 8,
      backgroundColor: '#D5B4B4',
      color: '#000000',
      borderRadius: 20,
      marginBottom: 23,
      marginLeft: 14,
    },
    botao: {
      marginTop: 8,
      marginRight: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalTitulo: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    modalInput: {
      width: '80%',
      borderWidth: 1,
      borderRadius: 8,
      padding: 8,
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    modalBotao: {
      backgroundColor: '#867070',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginLeft: 10
    },
    modalBotaoTexto: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#F5EBEB',
      border: 20,
    },
    modalVelTitulo: {
      textAlign: 'center',
      paddingTop: 16,
      lineHeight: 29,
      fontWeight: '900',
      fontSize: 24,
    },
    modalVelCon: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 16,
      paddingHorizontal: 16,
    },
    modalBotOp: {
      backgroundColor: '#867070',
      paddingHorizontal: 30,
      paddingVertical: 7,
      color: '#FFFFFF',
      borderRadius: 20,
      textAlign: 'center',
      marginBottom: 16,
      marginHorizontal: 8,
    },
    modalOpc: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: '700',
      color: '#F5EBEB',
      textAlign: 'center',
    },
    modalContainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
  export default estilos;