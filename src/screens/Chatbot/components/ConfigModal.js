import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Image } from 'react-native';
import Texto from '../../../components/Texto';
import estilos from '../../../styles/ChatbotStyles';
import Header from '../../../components/Header';
import voltar from '../../../assets/setaVolta.png';

const ConfigModal = ({ visible, toggleConfig, setVozVirtual, setVelVoz, repeatLastMessage, falaAtivada, setFalaAtivada }) => {
  const [velocidadeSelecionada, setVelocidadeSelecionada] = useState(null);

  useEffect(() => {
    // Define a velocidade da fala selecionada com base na velocidade atual
    if (falaAtivada) {
      if (velocidadeSelecionada !== 0.9) {
        setVelocidadeSelecionada(0.4);
      }
    } else {
      if (velocidadeSelecionada !== 0.4) {
        setVelocidadeSelecionada(0.2);
      }
    }
  }, [falaAtivada]);

  const toggleFala = () => {
    setFalaAtivada(!falaAtivada);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={toggleConfig}
    >
      <Header>
        <TouchableOpacity onPress={toggleConfig}>
          <Image source={voltar} accessibilityRole="image" />
        </TouchableOpacity>
      </Header>
      <View style={estilos.modalContainer}>
        <View style={estilos.modalContent}>
          <Texto style={estilos.modalVelTitulo}>Selecione a velocidade da fala:</Texto>
          <View style={estilos.modalVelCon}>
            <TouchableOpacity
              style={[
                estilos.modalBotOp,
                velocidadeSelecionada === 0.2 && { backgroundColor: 'hotpink' },
              ]}
              onPress={() => {
                setVozVirtual(6000);
                setVelVoz(0.2);
                setVelocidadeSelecionada(0.2);
              }}
            >
              <Texto style={estilos.modalOpc}>Lento</Texto>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                estilos.modalBotOp,
                velocidadeSelecionada === 0.4 && { backgroundColor: 'hotpink' },
              ]}
              onPress={() => {
                setVozVirtual(5000);
                setVelVoz(0.4);
                setVelocidadeSelecionada(0.4);
              }}
            >
              <Texto style={estilos.modalOpc}>Médio</Texto>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                estilos.modalBotOp,
                velocidadeSelecionada === 0.6 && { backgroundColor: 'hotpink' },
              ]}
              onPress={() => {
                setVozVirtual(1000);
                setVelVoz(0.6);
                setVelocidadeSelecionada(0.6);
              }}
            >
              <Texto style={estilos.modalOpc}>Rápido</Texto>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={estilos.modalBotOp} onPress={repeatLastMessage}>
            <Texto style={estilos.modalOpc}>Repetir Última Mensagem</Texto>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.modalBotOp} onPress={toggleFala}>
            <Texto style={estilos.modalOpc}>
              {falaAtivada ? 'Desativar Fala' : 'Ativar Fala'}
            </Texto>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfigModal;
