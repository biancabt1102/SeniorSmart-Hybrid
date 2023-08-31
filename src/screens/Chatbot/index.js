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
import enviar from '../../assets/enviar.png';
import DeviceInfo from 'react-native-device-info';
import AuthContext from '../../components/AuthContext';
import { PermissionsAndroid } from 'react-native';
import configuration from "../../assets/config.png";
import cabecinha from "../../assets/cabecinhaHeader.png"

import { criarPergunta } from '../../services/requests/pergunta';
import { criarResposta } from '../../services/requests/resposta';
import Texto from '../../components/Texto';
import { useNavigation } from '@react-navigation/native';

function Chatbot() {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [salvandoContato, setSalvandoContato] = useState(false);
  const [nomeContato, setNomeContato] = useState('');
  const [telefoneContato, setTelefoneContato] = useState('');
  const flatListRef = useRef(null); // Referência ao componente FlatList
  // Obter o modelo do dispositivo
  const deviceModel = DeviceInfo.getModel();
  const { nomeUsuario, isLoggedIn} = useContext(AuthContext);
  const [configVisible, setConfigVisible] = useState(false);
  const [vozVirtual, setVozVirtual] = useState(5000);
  const [falaAtivada, setFalaAtivada] = useState(true);


  let navegacao = ''

    if (isLoggedIn === true) {
      navegacao = () => navigation.navigate("Modelo", { screen: 'Perfil' });
    } else {
      navegacao = () => navigation.navigate("Invalido");
    }

  const toggleConfig = () => {
    setConfigVisible(!configVisible);
  }

  const toggleFala = () => {
    setFalaAtivada(!falaAtivada);
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
            Authorization: 'Bearer <Chave da OPENAI>', // Substitua pela sua chave de API do OpenAI
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
    if (!falaAtivada) {
      return;
    }
    
    const sentences = text.split('\n'); // Divide o texto em frases individuais
    sentences.forEach((sentence, index) => {
      setTimeout(() => {
        Tts.speak(sentence); // Fala cada frase individualmente
      }, index * vozVirtual); // Pausa de 5 segundos entre cada frase (4000 milissegundos)
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

  const handleSalvarContato = async () => {
    try {
      const permissionGranted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      ]);
  
      if (
        permissionGranted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED &&
        permissionGranted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        // As permissões foram concedidas, continue com o código para salvar o contato
        const newContact = {
          givenName: nomeContato, // Use o nomeContato como o first name
          phoneNumbers: [
            {
              label: 'mobile',
              number: telefoneContato,
            },
          ],
        };
  
        await Contacts.openContactForm(newContact);
        console.log('Contato salvo com sucesso!');
        Alert.alert('Contato salvo', 'O contato foi salvo com sucesso!');
        setTelefoneContato('');
        setSalvandoContato(false);
        setNomeContato(''); // Limpe o nome do contato somente após o sucesso
  
        // Adicione uma mensagem de sucesso à lista de mensagens
        const contatoSalvoMessage = {
          id: Math.random().toString(),
          content: 'Seu contato foi salvo com sucesso =)',
          isUser: false,
        };
  
        setMessages((prevMessages) => [...prevMessages, contatoSalvoMessage]);
      } else {
        // As permissões foram negadas
        Alert.alert('Permissões negadas', 'Você precisa conceder permissão para acessar e salvar contatos.');
      }
    } catch (error) {
      console.error('Erro ao salvar o contato:', error);
      Alert.alert('Erro ao salvar o contato', 'Ocorreu um erro ao tentar salvar o contato.');
    }
  };

  const repeatLastMessage = () => {
    const lastChatbotMessage = messages.slice().reverse().find(message => !message.isUser);
    
    if (lastChatbotMessage) {
      Tts.speak(lastChatbotMessage.content);
    }
  };


  return (
    <View style={estilos.container}>
      <View style={estilos.header}>
        <TouchableOpacity onPress={toggleConfig}>
            <Image source={configuration} accessibilityRole="image" style={estilos.config}/>
        </TouchableOpacity>
        <Texto style={estilos.titulo}>SeniorSmart</Texto>
        <TouchableOpacity onPress={navegacao}>
          <Image source={cabecinha} accessibilityRole="image" />
        </TouchableOpacity>
      </View>
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
        <View style={estilos.modalContainer2}>
          <Text style={estilos.modalTitulo}>Salvar Contato</Text>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={configVisible}
        onRequestClose={toggleConfig}
        >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Texto style={estilos.modalVelTitulo}>Selecione a velocidade da fala:</Texto>
            <View style={estilos.modalVelCon}>
              <TouchableOpacity style={estilos.modalBotOp} onPress={() => setVozVirtual(10000)}>
                <Texto style={estilos.modalOpc}>Lento</Texto>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.modalBotOp} onPress={() => setVozVirtual(5000)}>
                <Texto style={estilos.modalOpc}>Médio</Texto>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.modalBotOp} onPress={() => setVozVirtual(1000)}>
                <Texto style={estilos.modalOpc}>Rápido</Texto>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={estilos.modalBotOp} onPress={repeatLastMessage}>
              <Texto style={estilos.modalOpc}>Repetir Última Mensagem</Texto>
            </TouchableOpacity>
            <TouchableOpacity style={estilos.modalBotOp} onPress={toggleFala}>
              <Texto style={estilos.modalOpc}>{falaAtivada ? 'Desativar Fala' : 'Ativar Fala'}</Texto>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 40,
    backgroundColor: '#867070',
    alignItems: 'center',
    paddingHorizontal: 18
  },
  titulo: {
    fontSize: 14,
    color: '#F5EBEB',
    fontWeight: '900',
    lineHeight: 24,
    backgroundColor: '#867070'
  },
  config: {
    height: 40,
    width: 40
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
  modalContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F5EBEB',
    border: 20,
  },
  modalVelTitulo: {
    textAlign: 'center',
    paddingTop: 16,
    lineHeight:29,
    fontWeight: '900',
    fontSize: 24
  },
  modalVelCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  modalBotOp: {
    backgroundColor: "#867070",
    paddingHorizontal: 30,
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
    marginBottom: 16,
    marginHorizontal: 8
  },
  modalOpc: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '700',
    color: '#F5EBEB',
    textAlign: 'center'
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chatbot;
