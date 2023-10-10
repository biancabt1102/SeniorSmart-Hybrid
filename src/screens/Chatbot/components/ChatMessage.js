import React from 'react';
import { View } from 'react-native';
import estilos from '../styles';
import Texto from '../../../components/Texto';

const ChatMessage = ({ content, isUser, author, tamanhoFonte }) => {
  const mensagemContainerStyle = isUser ? estilos.mensagemUsuario : estilos.mensagemChatbot;
  const mensagemAutorStyle = isUser ? estilos.mensagemAutorUsuario : estilos.mensagemAutorChatbot;
  const mensagemTextStyle = isUser ? estilos.mensagemTextUsuario : estilos.mensagemTextChatbot;
  
  // Define os estilos com base no tamanhoFonte selecionado
  const mensagemContentStyle = {
    fontSize: tamanhoFonte === 'normal' ? 15 : 25,
    lineHeight: tamanhoFonte === 'normal' ? 18 : 30,
    fontWeight: '400',
    textAlign: 'justify',
  };

  return (
    <View style={[estilos.mensagemContainer, mensagemContainerStyle]}>
      <Texto style={[estilos.mensagemContent, mensagemTextStyle, mensagemContentStyle]}>
        {content}
      </Texto>
      <Texto style={[estilos.mensagemAutor, mensagemAutorStyle]}>
        {isUser ? author || 'você' : 'Sexta-feira'}
      </Texto>
    </View>
  );
};

export default ChatMessage;
