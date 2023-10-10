import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import Header from "../../components/Header";
import Modelo from "../../components/Modelo";
import Texto from "../../components/Texto";
import { validarCamposPagamento } from "../../components/ValidacoesPagamento";
import { cadastrarPagamento } from "../../services/requests/pagamento";
import estilos from "./styles";

export default function Pagamento({ route }) {
  const navigation = useNavigation();
  const { userIdPlano } = useContext(AuthContext);

  // Estados
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [numeroSemEspaco, setNumeroSemEspaco] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [dataSalvar, setDataSalvar] = useState("");

  // Função para criar o pagamento
  async function criarPagamento() {
    const resultado = await cadastrarPagamento(
      nomeCartao,
      numeroCartao,
      dataSalvar,
      cvv,
      userIdPlano,
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

  // Função para formatar o número do cartão
  const formatarNumeroCartao = (input) => {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Formate o número do cartão com espaços a cada 4 dígitos
    let formattedNumber = value.replace(/\B(?=(\d{4})+(?!\d))/g, " ");

    setNumeroCartao(formattedNumber);
    setNumeroSemEspaco(formattedNumber.replace(/\s/g, "")); // Remove os espaços antes de salvar
  };

  // Função para formatar a validade
  const formatarValidade = (input) => {
    const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const year = value.slice(2, 4);
    const month = value.slice(0, 2);

    // Formate a data como desejar
    let formattedDate = `${month}/${year}`;
    let data = `20${year}-${month}-01`
    setDataSalvar(data);


    setValidade(formattedDate);
  };

  // Função para lidar com o pagamento
  const handlePagar = async() => {
    const erro = validarCamposPagamento(
        nomeCartao,
        numeroCartao,
        validade,
        cvv
    );

    if (!erro) {
      await criarPagamento();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Contrato' }],
        })
      );
    } else {
      Alert.alert(erro);
    }
  };

  return (
    <>
      <Header/>
      <Modelo>
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
                placeholder="MM/AA"
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
      </Modelo>
    </>
  );
}

