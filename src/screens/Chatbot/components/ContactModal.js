import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Contacts from 'react-native-contacts';
import Texto from '../../../components/Texto';
import estilos from '../styles';

const ContactModal = ({ visible, onSaveContact, onCancel }) => {
  const [telefoneContato, setTelefoneContato] = useState('');

  useEffect(() => {
    if (visible) {
      setTelefoneContato('');
    }
  }, [visible]);

  const handleSalvarContato = async () => {
    try {
      const permissionGranted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      ]);

      const permissionCompare = permissionGranted['android.permission.READ_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED && permissionGranted['android.permission.WRITE_CONTACTS'] === PermissionsAndroid.RESULTS.GRANTED;

      if (permissionCompare) {
        // As permissões foram concedidas, continue com o código para salvar o contato
        const newContact = {
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

        onSaveContact(permissionCompare); // Chamamos a função fornecida para atualizar o estado no componente pai
      } else {
        // As permissões foram negadas
        Alert.alert('Permissões negadas', 'Você precisa conceder permissão para acessar e salvar contatos.');
      }
    } catch (error) {
      console.error('Erro ao salvar o contato:', error);
      Alert.alert('Erro ao salvar o contato', 'Ocorreu um erro ao tentar salvar o contato.');
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={estilos.modalContainer2}>
        <Texto style={estilos.modalTitulo}>Salvar Contato</Texto>

        <TextInput
          placeholder="Telefone do Contato"
          keyboardType="phone-pad"
          style={estilos.modalInput}
          value={telefoneContato}
          onChangeText={setTelefoneContato}
        />
        <View style={estilos.buttonContainer}>
          <TouchableOpacity style={estilos.modalBotao} onPress={handleSalvarContato}>
            <Texto style={estilos.modalBotaoTexto}>Salvar</Texto>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.modalBotao} onPress={onCancel}>
            <Texto style={estilos.modalBotaoTexto}>Cancelar</Texto>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ContactModal;
