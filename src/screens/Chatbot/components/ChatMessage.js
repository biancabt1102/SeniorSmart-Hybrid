import React from 'react';
import { View} from 'react-native';
import estilos from '../../../styles/ChatbotStyles';
import Texto from '../../../components/Texto';

const ChatMessage = ({ content, isUser, author }) => {
  const mensagemContainerStyle = isUser ? estilos.mensagemUsuario : estilos.mensagemChatbot;
  const mensagemAutorStyle = isUser ? estilos.mensagemAutorUsuario : estilos.mensagemAutorChatbot;
  const mensagemTextStyle = isUser ? estilos.mensagemTextUsuario : estilos.mensagemTextChatbot;

  return (
    <View style={[estilos.mensagemContainer, mensagemContainerStyle]}>
      <Texto style={[estilos.mensagemContent, mensagemTextStyle]}>{content}</Texto>
      <Texto style={[estilos.mensagemAutor, mensagemAutorStyle]}>
        {isUser ? author || 'você' : 'Sexta-feira'}
      </Texto>
    </View>
  );
};

export default ChatMessage;
