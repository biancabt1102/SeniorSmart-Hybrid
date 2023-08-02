import React, { useState } from "react";
import { View, StyleSheet, TextInput, Alert, ScrollView } from "react-native";
import Texto from "../../components/Texto";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function EditarCartao({ route }) {
  const [idUsuario, setIdUsuario] = useState(route.params.usuario.idUsuario);
  const [Titular, setTitular] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const senha = route.params.usuario.senhaUsuario;
  const navigation = useNavigation();

  function validarCampos() {
    if (
      Titular.trim() === "" ||
      numero.trim() === "" ||
      validade.trim() === "" ||
      cvv.trim() === ""
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }

    if (Titular.length < 3) {
      Alert.alert("Erro", "O titular do cartão deve ter mais do que 2 caracteres.");
      return false;
    }

    if (numero.replace(/\s/g, "").length !== 16) {
      Alert.alert("Erro", "Por favor, digite um número de cartão válido.");
      return false;
    }

    if (!validade.match(/^\d{2}\/\d{2}$/)) {
      Alert.alert("Erro", "Por favor, digite uma data de validade válida (MM/AA).");
      return false;
    }

    if (cvv.length !== 3) {
      Alert.alert("Erro", "Por favor, digite um CVV válido (3 dígitos).");
      return false;
    }

    return true;
  }

  async function handleEditarCartao() {
    if (!senha || senha !== confirmarSenha) {
      Alert.alert("Erro", "A senha digitada não corresponde à senha atual.");
      return;
    }

    if (validarCampos()) {
      // Restante do código para editar o cartão
      const resultado = await editarCartao(
        idUsuario,
        Titular,
        numero,
        validade,
        cvv
      );

      if (resultado === "sucesso") {
        Alert.alert("Sucesso", "Cartão editado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro ao editar o cartão!");
      }
    }
  }

  function formatarNumeroCartao(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Formate o número do cartão com espaços a cada 4 dígitos
    let formattedNumber = value.replace(/\B(?=(\d{4})+(?!\d))/g, " ");

    setNumero(formattedNumber);
  }

  function formatarValidade(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (value.length > 4) {
      // Limita o campo da validade em 4 caracteres (MM/AA)
      value = value.slice(0, 4);
    }

    let formattedValidade = value;
    if (value.length >= 3) {
      // Adiciona a barra ("/") automaticamente após 2 caracteres
      formattedValidade = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }

    setValidade(formattedValidade);
  }

  function formatarCVV(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Limita o campo do CVV em 3 dígitos
    let formattedCVV = value.slice(0, 3);

    setCvv(formattedCVV);
  }

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Texto style={estilos.titulo}>Editar cartão</Texto>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Titular: </Texto>
          <TextInput
            placeholder="Titular do cartão"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={Titular}
            onChangeText={setTitular}
            multiline
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Número: </Texto>
          <TextInput
            placeholder="Número do cartão"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={numero}
            keyboardType="numeric"
            maxLength={19}
            onChangeText={formatarNumeroCartao}
          />
        </View>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Validade: </Texto>
          <TextInput
            placeholder="(MM/AA)"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={validade}
            onChangeText={formatarValidade}
            keyboardType="phone-pad"
            maxLength={5}
            multiline
          />
          <Texto style={estilos.tituloInfo}>CVV: </Texto>
          <TextInput
            placeholder="CVV"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={cvv}
            onChangeText={formatarCVV}
            keyboardType="numeric"
            maxLength={3}
            multiline
          />
        </View>
      </View>
      <View style={estilos.conteiner}>
        <View style={estilos.informacoes}>
          <Texto style={estilos.tituloInfo}>Digite sua senha: </Texto>
          <TextInput
            placeholder="Coloque sua senha"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity style={estilos.botoes} onPress={handleEditarCartao}>
        <Texto style={estilos.textos}>Editar Dados</Texto>
      </TouchableOpacity>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "700",
    color: "#483E3E",
    textAlign: "center",
    marginTop: 17,
    marginBottom: 39,
  },
  conteiner: {
    marginHorizontal: 25,
    marginBottom: 45,
    borderWidth: 1,
    borderColor: "#483E3E",
    paddingHorizontal: 11,
    paddingTop: 11,
  },
  informacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  tituloInfo: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: "#483E3E",
  },
  conteudo: {
    borderWidth: 1,
    borderColor: "#A6AEB3",
    paddingVertical: 3,
    paddingHorizontal: 11,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    color: "#483E3E",
    maxWidth: '65%',
    maxHeight: 100
  },
  botoes: {
    backgroundColor: "#867070",
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    textAlign: "center",
    alignItems: "center",
    marginBottom: 14,
    marginHorizontal: 105,
  },
  textos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
