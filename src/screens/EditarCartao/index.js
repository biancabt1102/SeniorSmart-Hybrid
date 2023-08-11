import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import Texto from "../../components/Texto";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../components/AuthContext";
import { editarPagamento } from "../../services/requests/pagamento";
import { buscaPagamentoPlano } from "../../services/requests/pagamento"; // Certifique-se de importar a função correta para buscar o usuário por email

export default function EditarCartao() {
  const {
    userIdPlano,
    setIdDoCartao,
    setNomeNoCartao,
    setNumeroDoCartao,
    setValidadeDoCartao,
    setCodigoDoCartao,
    nomeNoCartao,
    numeroDoCartao,
    validadeDoCartao,
    codigoDoCartao,
    userSenha,
    idDoCartao,
    tipoPlanoUsuario,
    planoMensalUsuario,
    planoAnualUsuario,
  } = useContext(AuthContext);

  const [Titular, setTitular] = useState(nomeNoCartao);
  const [numero, setNumero] = useState(numeroDoCartao);
  const [validade, setValidade] = useState(validadeDoCartao);
  const [cvv, setCvv] = useState(codigoDoCartao);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const senha = userSenha;
  const navigation = useNavigation();

  useEffect(() => {
    procurarPagamento();
  }, []);

  async function procurarPagamento() {
    const resposta = await buscaPagamentoPlano(userIdPlano); // Substitua pela função correta para buscar o usuário por email
    console.log("linguiça" + resposta.id)
    setIdDoCartao(resposta.id);
    setNomeNoCartao(resposta.nomeNoCartao);
    setNumeroDoCartao(resposta.numeroDoCartao);
    setValidadeDoCartao(resposta.validadeDoCartao);
    setCodigoDoCartao(resposta.codigoDoCartao);
    return resposta;
  }

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

    if (!validade.match(/^\d{4}-\d{2}-\d{2}$/)) {
      Alert.alert("Erro", "Por favor, digite uma data de validade válida (YYYY-MM-DD).");
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
    resposta = procurarPagamento();
      console.log(resposta)
      const resultado = await editarPagamento(
        idDoCartao,
        Titular,
        numero,
        validade,
        cvv,
        userIdPlano,
        tipoPlanoUsuario,
        planoMensalUsuario,
        planoAnualUsuario
      );

      if (resultado === "sucesso") {
        setNomeNoCartao(Titular);
        setNumeroDoCartao(numero);
        setValidadeDoCartao(validade);
        setCodigoDoCartao(cvv);
        Alert.alert("Sucesso", "Cartão editado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro ao editar o cartão!");
      }
    }
  }

  function formatarNumeroCartao(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let formattedNumber = value.replace(/\B(?=(\d{4})+(?!\d))/g, " ");
    setNumero(formattedNumber);
  }

  function formatarValidade(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    if (value.length > 8) {
      // Limita o campo da validade em 8 caracteres (YYYY-MM-DD)
      value = value.slice(0, 8);
    }

    let formattedValidade = value;
    if (value.length >= 6) {
      // Adiciona hífens ("-") automaticamente após 4 e 6 caracteres
      formattedValidade = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
    }

    setValidade(formattedValidade);
  }

  function formatarCVV(input) {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let formattedCVV = value.slice(0, 3); // Limita o campo do CVV em 3 dígitos
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
            placeholder="YYYY-MM-DD"
            autoCapitalize="none"
            style={estilos.conteudo}
            value={validade}
            onChangeText={formatarValidade}
            keyboardType="numeric"
            maxLength={10}
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
    maxHeight: 100,
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
