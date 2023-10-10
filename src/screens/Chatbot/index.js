import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  AsyncStorage,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Tts from 'react-native-tts';
import configuration from '../../assets/config.png';
import enviar from '../../assets/enviar.png';
import AuthContext from '../../components/AuthContext';

import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { criarPergunta } from '../../services/requests/pergunta';
import { criarResposta } from '../../services/requests/resposta';
import estilos from './styles';
import ChatMessage from './components/ChatMessage';
import ConfigModal from './components/ConfigModal';
import ContactModal from './components/ContactModal';
import OpenAIService from './components/OpenAIService';
import { PermissionsAndroid } from 'react-native';

function Chatbot() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [salvandoContato, setSalvandoContato] = useState(false);
  const flatListRef = useRef(null); // Referência ao componente FlatList
  // Obter o modelo do dispositivo
  const deviceModel = DeviceInfo.getModel();
  const {
    isLoggedIn,
    nomeUsuario,
    vozVirtual,
    velVoz,
    tamanhoFonte
  } = useContext(AuthContext);
  const [configVisible, setConfigVisible] = useState(false);
  const [falaAtivada, setFalaAtivada] = useState(true);

  let navegacao = '';

  if (isLoggedIn) {
    navegacao = () => navigation.navigate('Modelo', { screen: 'Perfil' });
  } else {
    navegacao = () => navigation.navigate('Invalido');
  }

  const toggleConfig = () => {
    setConfigVisible(!configVisible);
  };

  useEffect(() => {
    Tts.setDefaultLanguage('pt-BR');
    Tts.addEventListener('tts-finish', handleTtsFinish);

    // Carrega as mensagens anteriores do AsyncStorage
    AsyncStorage.getItem('chatMessages')
      .then((messagesData) => {
        if (messagesData) {
          const savedMessages = JSON.parse(messagesData);
          setMessages(savedMessages);
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar mensagens:', error);
      });

    return () => {
      Tts.removeEventListener('tts-finish', handleTtsFinish);
    };
  }, []);

  const handleTtsFinish = () => {};

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    const newMessage = {
      id: Math.random().toString(),
      content: message,
      isUser: true,
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setMessage('');

    // Salva as mensagens no AsyncStorage
    AsyncStorage.setItem('chatMessages', JSON.stringify(newMessages)) // Salva as mensagens atualizadas
      .catch((error) => {
        console.error('Erro ao salvar mensagens:', error);
      });

    if (
      message.toLowerCase() === 'salvar contato' ||
      message.toLowerCase() === 'Salvar contato' ||
      message.toLowerCase() === 'salvar Contato' ||
      message.toLowerCase() === 'Salvar Contato' ||
      message.toLowerCase() === 'SALVAR CONTATO' ||
      message.toLowerCase() === 'SALVAR CONTATO ' ||
      message.toLowerCase() === 'Salvar Contato ' ||
      message.toLowerCase() === 'salvar Contato ' ||
      message.toLowerCase() === 'salvar contato ' 
    ) {
      setSalvandoContato(true);
      return;
    }

    if (
      message.toLowerCase() === 'localização' ||
      message.toLowerCase() === 'Localização' ||
      message.toLowerCase() === 'LOCALIZAÇÃO' ||
      message.toLowerCase() === 'localizaço' ||
      message.toLowerCase() === 'Localizaço ' ||
      message.toLowerCase() === 'Localização ' || 
      message.toLowerCase() === 'localização '  
    ) {
      // Solicitar permissão de localização
      requestLocationPermission();
      return;
    }

    if (
      message.toLowerCase() === 'quero ir para a praça da república' ||
      message.toLowerCase() === 'quero ir para a praça da republica' ||
      message.toLowerCase() === 'quero ir para a praca da republica' ||
      message.toLowerCase() === 'Quero ir para a praça da república' ||
      message.toLowerCase() === 'Quero ir para a praça da republica' ||
      message.toLowerCase() === 'Quero ir para a praca da republica' ||
      message.toLowerCase() === 'quero ir para a Praça da República' ||
      message.toLowerCase() === 'Quero ir para a Praça da República' ||
      message.toLowerCase() === 'quero ir para a Praça da REPÚBLICA' ||
      message.toLowerCase() === 'Quero ir para a Praça da REPÚBLICA' ||
      message.toLowerCase() === 'quero ir para a praça da REPÚBLICA' ||
      message.toLowerCase() === 'Quero ir para a praça da REPÚBLICA' ||
      message.toLowerCase() === 'quero ir para a Praça da República ' ||
      message.toLowerCase() === 'Quero ir para a Praça da República ' ||
      message.toLowerCase() === 'quero ir para a Praça da REPÚBLICA ' ||
      message.toLowerCase() === 'Quero ir para a Praça da REPÚBLICA ' ||
      message.toLowerCase() === 'quero ir para a praça da REPÚBLICA ' ||
      message.toLowerCase() === 'Quero ir para a praça da REPÚBLICA ' ||
      message.toLowerCase() === 'quero ir para a Praça da República  ' ||
      message.toLowerCase() === 'Quero ir para a Praça da República  ' ||
      message.toLowerCase() === 'quero ir para a Praça da REPÚBLICA  ' ||
      message.toLowerCase() === 'Quero ir para a Praça da REPÚBLICA  ' ||
      message.toLowerCase() === 'leve-me à praça da república' ||
      message.toLowerCase() === 'me direcione para a Praça da República' ||
      message.toLowerCase() === 'como chegar à Praça da República' ||
      message.toLowerCase() === 'como ir até a praça da República' ||
      message.toLowerCase() === 'navegue até a Praça da República' ||
      message.toLowerCase() === 'Praça da República' ||
      message.toLowerCase() === 'Praça da REPÚBLICA' ||
      message.toLowerCase() === 'REPÚBLICA' 
    ) {
      // Resposta personalizada
      const respostaPersonalizada = "Você está na Av. Lins De Vasconcelos e deve pegar o Praça da República 4113-10";
      
      const newMessage = {
        id: Math.random().toString(),
        content: respostaPersonalizada,
        isUser: false,
      };
    
      const newMessages = [...messages, newMessage];
    
      setMessages(newMessages);
      setMessage('');
    
      // Salva as mensagens no AsyncStorage
      AsyncStorage.setItem('chatMessages', JSON.stringify(newMessages))
        .catch((error) => {
          console.error('Erro ao salvar mensagens:', error);
        });
    
      // Fala a resposta
      speakText(respostaPersonalizada);
    
      // Rola para o final da lista
      flatListRef.current.scrollToEnd({ animated: true });
    
      return;
    }
    
    if (
      message.toLowerCase() === 'quero comer hambúrguer' ||
      message.toLowerCase() === 'quero comer hamburguer' ||
      message.toLowerCase() === 'quero comer hamburguer ' ||
      message.toLowerCase() === 'Quero comer hambúrguer' ||
      message.toLowerCase() === 'Quero comer hamburguer' ||
      message.toLowerCase() === 'Quero comer hamburguer ' ||
      message.toLowerCase() === 'quero um hambúrguer' ||
      message.toLowerCase() === 'estou com fome, quero hambúrguer' ||
      message.toLowerCase() === 'gostaria de comer hambúrguer agora' ||
      message.toLowerCase() === 'onde posso encontrar hambúrguer' ||
      message.toLowerCase() === 'me indique uma hamburgueria' ||
      message.toLowerCase() === 'preciso de um hambúrguer' ||
      message.toLowerCase() === 'hambúrguer' 
    ) {
      // Resposta personalizada para hambúrguer
      const respostaPersonalizada = "Você está na Av. Lins De Vasconcelos e pode ir na Burger Espacial, Av. Lins de Vasconcelos, 1303 - Cambuci, São Paulo - SP, 01537-001. Aberta das 12:00 ás 00:00";
    
      const newMessage = {
        id: Math.random().toString(),
        content: respostaPersonalizada,
        isUser: false,
      };
    
      const newMessages = [...messages, newMessage];
    
      setMessages(newMessages);
      setMessage('');
    
      // Salva as mensagens no AsyncStorage
      AsyncStorage.setItem('chatMessages', JSON.stringify(newMessages))
        .catch((error) => {
          console.error('Erro ao salvar mensagens:', error);
        });
    
      // Fala a resposta
      speakText(respostaPersonalizada);
    
      // Rola para o final da lista
      flatListRef.current.scrollToEnd({ animated: true });
    
      return;
    }
    

    try {
      // Use o serviço OpenAIService para enviar a mensagem
      const respostaGPT = await OpenAIService.enviarMensagem(
        message,
        nomeUsuario,
        deviceModel
      );

      if (respostaGPT) {
        const gptResponse = {
          id: Math.random().toString(),
          content: respostaGPT,
          isUser: false,
        };

        const updatedMessages = [...newMessages, gptResponse];

        setMessages(updatedMessages);

        // Salva as mensagens atualizadas no AsyncStorage (incluindo a nova resposta)
        AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages)).catch(
          (error) => {
            console.error('Erro ao salvar mensagens:', error);
          }
        );

        speakText(gptResponse.content);

        const idPergunta = await criarPergunta(message);
        if (idPergunta) {
          const statusResposta = await criarResposta(
            gptResponse.content,
            idPergunta,
            message
          ); // Salvar a resposta
          if (statusResposta === 'sucesso') {
            console.log('Pergunta e resposta salvas com sucesso!');
          } else {
            console.log('Erro ao salvar a resposta');
          }
        } else {
          console.log('Erro ao salvar a pergunta');
        }
      }
    } catch (error) {
      console.error('Erro ao chamar a API do GPT:', error);
    }

    // Rolar para o final da lista
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const speakText = (text) => {
    if (!falaAtivada) {
      return;
    }
    const sentences = text.split('/n' || '.' || '. ' || '  '); // Divide o texto em frases individuais
    sentences.forEach((sentence, index) => {
      setTimeout(() => {
        Tts.setDefaultRate(velVoz);
        Tts.speak(sentence); // Fala cada frase individualmente
      }, index * vozVirtual); // Pausa de 5 segundos entre cada frase (4000 milissegundos)
    });
  };

  const renderMensagem = ({ item }) => {
    return (
      <ChatMessage
        content={item.content}
        isUser={item.isUser}
        author={nomeUsuario}
        tamanhoFonte={tamanhoFonte}
      />
    );
  };

  const hideContactModal = () => {
    setSalvandoContato(false);
  };

  const handleSalvarContato = async (permissionCompare) => {
    if (permissionCompare) {
      setSalvandoContato(false);

      // Adicione uma mensagem de sucesso à lista de mensagens
      const contatoSalvoMessage = {
        id: Math.random().toString(),
        content: 'Seu contato foi salvo com sucesso =)',
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, contatoSalvoMessage]);
    }
  };

  const repeatLastMessage = () => {
    const lastChatbotMessage = messages.slice().reverse().find((message) => !message.isUser);

    if (lastChatbotMessage) {
      Tts.speak(lastChatbotMessage.content);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização',
          message: 'O Chatbot precisa de acesso à sua localização para responder à sua pergunta.',
          buttonPositive: 'Conceder Permissão',
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Feature futura para mostrar a localização da pessoa e pontos de interesse
        const newMessage = {
          id: Math.random().toString(),
          content: 'Você se encontra na Você está na Av. Lins De Vasconcelos.\nPerto da sua localização encontramos possíveis lugares de interesse:\n\nFIAP - Aclimação\nEducação superior\nAv. Lins de Vasconcelos, 1222 - Aclimação, São Paulo - SP, 01538-001\n\nCacau Show\nLoja de chocolates\nAv. Lins de Vasconcelos, 1251 - Cambuci, São Paulo - SP, 01538-001\n\nEduPoint\nConsultor educacional\nAv. Lins de Vasconcelos, 1222 - Cambuci, São Paulo - SP, 01538-001\n\nChurros DamaC\nCasa de churros\nAv. Lins de Vasconcelos, 1194 - Cambuci, São Paulo - SP, 01538-001\n\nSalão Alice\nSalão de Beleza\nAv. Lins de Vasconcelos, 1213 - Cambuci, São Paulo - SP, 01537-001',
          isUser: false,
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        // Salvar as mensagens atualizadas no AsyncStorage
        AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages)).catch(
          (error) => {
            console.error('Erro ao salvar mensagens:', error);
          }
        );

        // Falar o texto "Brasil" se a fala estiver ativada
        speakText(newMessage.content);

        // Rolar para o final da lista
        flatListRef.current.scrollToEnd({ animated: true });
      } else {
        console.warn('Permissão de localização negada');
      }
    } catch (err) {
      console.error('Erro ao solicitar permissão de localização:', err);
    }
  };

  return (
    <View style={estilos.container}>
      <Header>
        <TouchableOpacity onPress={toggleConfig}>
          <Image source={configuration} accessibilityRole="image" style={estilos.config} />
        </TouchableOpacity>
      </Header>
      <FlatList
        ref={flatListRef} // Adiciona a referência ao componente FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMensagem}
        inverted={false} // Mantém como false para exibir as mensagens de cima para baixo
      />
      <View style={estilos.inputContainer}>
        <TextInput
          style={estilos.input}
          placeholder="Clique aqui para escrever sua pergunta"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={estilos.botao} onPress={handleSendMessage}>
          <Image source={enviar} />
        </TouchableOpacity>
      </View>
      <ContactModal
        visible={salvandoContato}
        onSaveContact={handleSalvarContato}
        onCancel={hideContactModal}
      />
      <ConfigModal
        visible={configVisible}
        toggleConfig={toggleConfig}
        repeatLastMessage={repeatLastMessage}
        falaAtivada={falaAtivada}
        setFalaAtivada={setFalaAtivada}
      />
    </View>
  );
}

export default Chatbot;
