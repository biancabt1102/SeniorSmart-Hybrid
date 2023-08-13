import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  Alert,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import Tts from 'react-native-tts';
import Contacts from 'react-native-contacts';
import Header from '../../components/Header';
import enviar from '../../assets/enviar.png';
import DeviceInfo from 'react-native-device-info';
import AuthContext from '../../components/AuthContext';

import { criarPergunta } from '../../services/requests/pergunta';
import { criarResposta } from '../../services/requests/resposta';

function Chatbot() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [salvandoContato, setSalvandoContato] = useState(false);
  const [nomeContato, setNomeContato] = useState('');
  const [telefoneContato, setTelefoneContato] = useState('');
  const flatListRef = useRef(null); // Referência ao componente FlatList
  // Obter o modelo do dispositivo
  const deviceModel = DeviceInfo.getModel();
  const { nomeUsuario } = useContext(AuthContext);

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

  const handleTtsFinish = () => {
    // Callback chamado quando a fala é concluída
    // Pode realizar ações adicionais aqui, se necessário
  };

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

    if (message.toLowerCase() === 'salvar contato') {
      setSalvandoContato(true);
      return;
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Seu nome é Sexta-feira e você trabalha para a Seniorsmart ajudando idosos. Você é um assistente útil. Explique as coisas de um modo fácil pois está falando com um idoso, o nome da pessoa é ${nomeUsuario}. Modelo do meu celular é o ${deviceModel}.`,
            },
            { role: 'user', content: message },
          ],
          max_tokens: 4000, // Substitua pelo número adequado de tokens de resposta
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <CHAVE DA OPENAI>', // Substitua pela sua chave de API do OpenAI
          },
        }
      );

      if (response.status === 200) {
        const gptResponse = {
          id: Math.random().toString(),
          content: response.data.choices[0].message.content.trim(),
          isUser: false,
        };

        const updatedMessages = [...newMessages, gptResponse];

        setMessages(updatedMessages);

        // Salva as mensagens atualizadas no AsyncStorage (incluindo a nova resposta)
        AsyncStorage.setItem('chatMessages', JSON.stringify(updatedMessages)).catch((error) => {
          console.error('Erro ao salvar mensagens:', error);
        });

        speakText(gptResponse.content);

        const idPergunta = await criarPergunta(message);
        if (idPergunta) {
          const statusResposta = await criarResposta(gptResponse.content, idPergunta, message); // Salvar a resposta
          if (statusResposta === 'sucesso') {
            console.log('Pergunta e resposta salvas com sucesso!');
          } else {
            console.log('Erro ao salvar a resposta');
          }
        } else {
          console.log('Erro ao salvar a pergunta');
        }
      } else {
        console.error('Erro ao chamar a API do GPT');
      }
    } catch (error) {
      console.error('Erro ao chamar a API do GPT:', error);
    }

    // Rolar para o final da lista
    flatListRef.current.scrollToEnd({ animated: true });
  };

  const speakText = (text) => {
    const sentences = text.split('. '); // Divide o texto em frases individuais
    sentences.forEach((sentence, index) => {
      setTimeout(() => {
        Tts.speak(sentence); // Fala cada frase individualmente
      }, index * 5000); // Pausa de 5 segundos entre cada frase (4000 milissegundos)
    });
  };

  const renderMensagem = ({ item }) => {
    const mensagemContainerStyle = item.isUser ? estilos.mensagemUsuario : estilos.mensagemChatbot;
    const mensagemAutorStyle = item.isUser
      ? estilos.mensagemAutorUsuario
      : estilos.mensagemAutorChatbot;
    const mensagemTextStyle = item.isUser
      ? estilos.mensagemTextUsuario
      : estilos.mensagemTextChatbot;

    return (
      <View style={[estilos.mensagemContainer, mensagemContainerStyle]}>
        <Text style={[estilos.mensagemContent, mensagemTextStyle]}>{item.content}</Text>
        <Text style={[estilos.mensagemAutor, mensagemAutorStyle]}>
          {item.isUser ? nomeUsuario || 'você' : 'Sexta-feira'}
        </Text>
      </View>
    );
  };

  const handleSalvarContato = () => {
    const newContact = {
      givenName: nomeContato,
      phoneNumbers: [
        {
          label: 'mobile',
          number: telefoneContato,
        },
      ],
    };

    Contacts.addContact(newContact, (err) => {
      if (err) {
        console.error('Erro ao salvar o contato:', err);
        return;
      }

      Alert.alert('Contato salvo', 'O contato foi salvo com sucesso!');
      setNomeContato('');
      setTelefoneContato('');
      setSalvandoContato(false);
    });
  };

  return (
    <View style={estilos.container}>
      <Header />
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
      <Modal visible={salvandoContato} animationType="slide">
        <View style={estilos.modalContainer}>
          <Text style={estilos.modalTitulo}>Salvar Contato</Text>
          <TextInput
            placeholder="Nome do Contato"
            autoCapitalize="words"
            style={estilos.modalInput}
            value={nomeContato}
            onChangeText={setNomeContato}
          />
          <TextInput
            placeholder="Telefone do Contato"
            keyboardType="phone-pad"
            style={estilos.modalInput}
            value={telefoneContato}
            onChangeText={setTelefoneContato}
          />
          <TouchableOpacity style={estilos.modalBotao} onPress={handleSalvarContato}>
            <Text style={estilos.modalBotaoTexto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EBEB',
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
  modalBotao: {
    backgroundColor: '#867070',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  modalBotaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chatbot;
