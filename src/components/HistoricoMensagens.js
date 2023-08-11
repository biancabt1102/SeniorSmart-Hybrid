import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistoricoMensagens = ({ mensagens }) => {
  const renderMensagem = ({ item }) => (
    <View style={styles.mensagemContainer}>
      <Text style={styles.mensagemText}>{item.pergunta}</Text>
      <Text style={styles.mensagemText}>{item.resposta}</Text>
    </View>
  );

  return (
    <FlatList
      data={mensagens}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderMensagem}
    />
  );
};

const styles = StyleSheet.create({
  mensagemContainer: {
    padding: 8,
    backgroundColor: '#F5EBEB',
    marginBottom: 8,
    borderRadius: 8,
  },
  mensagemText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 18,
  },
});

export default HistoricoMensagens;
