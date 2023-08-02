import React, { useState } from "react";
import Header from "../../components/Header";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import Texto from "../../components/Texto";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { cadastrarPagamento } from "../../services/requests/pagamento";

export default function Pagamento({ route }) {
  const navigation = useNavigation();
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [numeroSemEspaco, setNumeroSemEspaco] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");

  async function criar() {
    const resultado = await cadastrarPagamento(
      nomeCartao,
      numeroSemEspaco,
      validade,
      cvv,
      route.params.planoid,
      route.params.tipo,
      route.params.mensal,
      route.params.anual,
    );

    if (resultado === "sucesso") {
      Alert.alert("Sucesso", "Pagamento realizado com sucesso!");
    } else {
      Alert.alert("Erro ao criar o pagamento!");
    }
  }

  const validarCampos = () => {
    if (
      nomeCartao.trim() === "" ||
      numeroCartao.trim() === "" ||
      validade.trim() === "" ||
      cvv.trim() === ""
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return false;
    }

    if (numeroCartao.length !== 19) {
      Alert.alert("Erro", "Por favor, digite um número de cartão válido.");
      return false;
    }

    if (!validade.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert("Erro", "Por favor, digite uma data de validade válida (MM/AA).");
      return false;
    }

    if (cvv.length !== 3) {
      Alert.alert("Erro", "Por favor, digite um CVV válido (3 dígitos).");
      return false;
    }

    if (nomeCartao.length < 3) {
      Alert.alert("Erro", "O nome impresso no cartão deve ter mais do que 2 caracteres.");
      return false;
    }

    return true;
  };

  const handlePagar = () => {
    if (validarCampos()) {
      navigation.navigate("Contratado", {usuario: route.params.usuario}); // colocar depois quando o cadastro dar sucesso
      criar();
    }
  };

  const formatarNumeroCartao = (input) => {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Formate o número do cartão com espaços a cada 4 dígitos
    let formattedNumber = value.replace(/\B(?=(\d{4})+(?!\d))/g, " ");

    setNumeroCartao(formattedNumber);
    setNumeroSemEspaco(formattedNumber.replace(/\s/g, "")); // Remove os espaços antes de salvar
  };

  const formatarValidade = (input) => {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    // Formate a data como desejar
    let formattedDate = `${year}-${month}-${day}`;

    setValidade(formattedDate);
  };

  return (
    <>
      <Texto style={estilos.tituloPreco}>Total</Texto>
      <Texto style={estilos.preco}>R${route.params.preco}</Texto>
      <Texto style={estilos.tituloDados}>Dados do cartão:</Texto>
      <View style={estilos.dados}>
        <Texto style={estilos.nomes}>Nome impresso no cartão:</Texto>
        <TextInput
          autoCapitalize="none"
          style={estilos.campos}
          value={nomeCartao}
          onChangeText={setNomeCartao}
        />
        <Texto style={estilos.nomes}>Número do cartão:</Texto>
        <TextInput
          placeholder="xxxx xxxx xxxx xxxx"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          style={estilos.campos}
          keyboardType="numeric"
          maxLength={19}
          value={numeroCartao}
          onChangeText={formatarNumeroCartao}
        />
        <View style={estilos.titulos}>
          <Texto style={estilos.validade}>Validade:</Texto>
          <Texto style={estilos.cvv}>CVV:</Texto>
        </View>
        <View style={estilos.informacoes}>
          <TextInput
            placeholder="AAAA/MM/DD"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
            style={estilos.informacoesCampos}
            keyboardType="numeric"
            value={validade}
            onChangeText={formatarValidade}
          />
          <TextInput
            placeholder="XXX"
            placeholderTextColor="#FFFFFF"
            autoCapitalize="none"
            style={estilos.informacoesCampos}
            keyboardType="numeric"
            maxLength={3}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handlePagar} style={estilos.botoes}>
        <Texto style={estilos.textos}>Pagar</Texto>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  tituloPreco: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "700",
    color: "#000000",
    marginTop: 10,
    marginLeft: 19,
  },
  preco: {
    textAlign: "center",
    fontSize: 24,
    lineHeight: 34,
    fontWeight: "400",
    color: "#000000",
    marginTop: 20,
    marginBottom: 50,
  },
  tituloDados: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 18,
    marginLeft: 19,
  },
  dados: {
    marginHorizontal: 33,
    marginBottom: 77,
  },
  titulos: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  informacoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nomes: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "400",
    color: "#000000",
  },
  validade: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "400",
    color: "#000000",
    width: "50%",
  },
  cvv: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "400",
    color: "#000000",
    width: "45%",
  },
  campos: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
    backgroundColor: "#867070",
    borderRadius: 5,
    marginBottom: 21,
    paddingLeft: 10
  },
  informacoesCampos: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFFFFF",
    backgroundColor: "#867070",
    borderRadius: 5,
    marginBottom: 21,
    width: "45%",
    paddingLeft: 10
  },
  botoes: {
    backgroundColor: "#867070",
    paddingHorizontal: 50,
    paddingVertical: 7,
    color: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 14,
    marginHorizontal: 45,
    marginBottom: "50%",
    marginHorizontal: 80,
  },
  textos: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
