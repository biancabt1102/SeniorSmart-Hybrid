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
        // Feature futura para mostrar a localização da pessoa e pontos de interesse utilizando a API do Maps, exemplo de como seria com o endereço do next.
        const newMessage = {
          id: Math.random().toString(),
          content: 'Você se encontra na Av. Manuel Bandeira.\nPerto da sua localização encontramos possíveis lugares de interesse:\n\nSpark Arena\nLocal para eventos\nAv. Manuel Bandeira, 500 - Vila Leopoldina, São Paulo - SP, 05317-020\n\nPicPay\nEscritório da empresa\nAv. Manuel Bandeira, 291 - Bloco A - Vila Leopoldina, São Paulo - SP, 05317-020\n\nClínica Buzzini\nClínica de ginecologia e obstetrícia\nVilla Lobos Office Park, Torre C - Av. Queiroz Filho, 1700 - conj 604 - Vila Hamburguesa, São Paulo - SP, 05319-000\n\nCarrefour Hipermercado\nHipermercado\nAv. Queiroz Filho, Sn - Vila Leopoldina, São Paulo - SP, 05319-075\n\nFrozen - In Concert\nTeatro de Arena\nAv. Queiroz Filho, 1.315 - Vila Hamburguesa, São Paulo - SP, 05317-020',
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
