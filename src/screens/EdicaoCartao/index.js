import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import Texto from "../../components/Texto";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AuthContext from "../../components/AuthContext";
import { editarPagamento } from "../../services/requests/pagamento";
import { buscaPagamentoPlano } from "../../services/requests/pagamento"; 
import { validarCamposPagamento } from "../../components/ValidacoesPagamento";
import estilos from "./styles";
import Header from "../../components/Header"
import Modelo from "../../components/Modelo";

export default function EdicaoCartao() {
    const {
        userIdPlano,
        userSenha,
        idDoCartao,
        tipoPlanoUsuario,
        planoMensalUsuario,
        planoAnualUsuario,
        updateAuthState
    } = useContext(AuthContext);
    
    const navigation = useNavigation();

    const [titular, setNomeNoCartao] = useState('');
    const [numero, setNumeroDoCartao] = useState('');
    const [validade, setValidadeDoCartao] = useState('');
    const [cvv, setCodigoDoCartao] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [numeroSemEspaco, setNumeroSemEspaco] = useState('');
    const [dataSalvar, setDataSalvar] = useState("");
  
    useEffect(() => {
        procurarPagamento();
      }, []);
    
      async function procurarPagamento() {
        try {
            const resposta = await buscaPagamentoPlano(userIdPlano);
            updateAuthState({ idDoCartao: resposta.id });
            setNomeNoCartao(resposta.nomeNoCartao);
            setNumeroDoCartao(resposta.numeroDoCartao);
            setValidadeDoCartao(reFormatarData(resposta.validadeDoCartao));
            setCodigoDoCartao(resposta.codigoDoCartao);
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
        }
    }

    async function alterar() {
        try {
            const mensagemErro = validarCamposPagamento(
                titular,
                numero,
                validade,
                cvv
            );

            if (mensagemErro) {
                throw new Error(mensagemErro);
              }
        
              if (userSenha !== confirmarSenha) {
                throw new Error("A senha digitada não corresponde à senha atual.");
              }

              // Chamada para alterar os dados
              const resultado = await editarPagamento(
                idDoCartao,
                titular,
                numero,
                dataSalvar,
                cvv,
                userIdPlano,
                tipoPlanoUsuario,
                planoMensalUsuario,
                planoAnualUsuario
              );

              if (resultado === "sucesso") {
                Alert.alert("Dados atualizados com sucesso!");
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Chatbot' }],
                  })
                );
              } else {
                // Feedback visual de erro
                Alert.alert("Erro ao atualizar os dados.");
              }

        } catch (error){
            // Tratamento de erros
            Alert.alert("Erro", error.message);
        }
    }

    // Função para formatar o número do cartão
    const formatarNumeroCartao = (input) => {
        const value = input.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

        // Formate o número do cartão com espaços a cada 4 dígitos
        let formattedNumber = value.replace(/\B(?=(\d{4})+(?!\d))/g, " ");

        setNumeroDoCartao(formattedNumber);
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


        setValidadeDoCartao(formattedDate);
    };

    function reFormatarData(data) {
        const partes = data.split('-'); // Divide a data em partes (ano, mês, dia)
        
        if (partes.length !== 3) {
            // Verifica se a data possui o formato esperado
            return null;
        }
        
        const ano = partes[0].slice(2); // Pega os dois últimos dígitos do ano
        const mes = partes[1];
        
        // Formate a data como "MM/AA"
        return `${mes}/${ano}`;
    }

    return (
        <ScrollView contentContainerStyle={estilos.container}>
            <Header voltar/>
            <Modelo>
                <Texto style={estilos.titulo}>Editar cartão</Texto>
                <View style={estilos.conteiner}>
                    <View style={estilos.informacoes}>
                    <Texto style={estilos.tituloInfo}>Titular: </Texto>
                    <TextInput
                        placeholder="Titular do cartão"
                        autoCapitalize="none"
                        style={estilos.conteudo}
                        value={titular}
                        onChangeText={setNomeNoCartao}
                        placeholderTextColor="#000000"
                    />
                    </View>
                    <View style={estilos.informacoes}>
                    <Texto style={estilos.tituloInfo}>Número: </Texto>
                    <TextInput
                        placeholder="xxxx xxxx xxxx xxxx"
                        autoCapitalize="none"
                        style={estilos.conteudo}
                        value={numero}
                        keyboardType="numeric"
                        maxLength={19}
                        onChangeText={formatarNumeroCartao}
                        placeholderTextColor="#000000"
                    />
                    </View>
                    <View style={estilos.informacoes}>
                    <Texto style={estilos.tituloInfo}>Validade: </Texto>
                    <TextInput
                        placeholder="MM/AA"
                        autoCapitalize="none"
                        style={estilos.conteudo}
                        value={validade}
                        onChangeText={formatarValidade}
                        keyboardType="numeric"
                        placeholderTextColor="#000000"
                    />
                    <Texto style={estilos.tituloInfo}>CVV: </Texto>
                    <TextInput
                        placeholder="XXX"
                        autoCapitalize="none"
                        style={estilos.conteudo}
                        value={cvv}
                        onChangeText={setCodigoDoCartao}
                        keyboardType="numeric"
                        maxLength={3}
                        placeholderTextColor="#000000"
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
                        placeholderTextColor="#000000"
                    />
                    </View>
                </View>
                <TouchableOpacity style={estilos.botoes} onPress={alterar}>
                    <Texto style={estilos.textos}>Editar Dados</Texto>
                </TouchableOpacity>
          </Modelo>
        </ScrollView>
      );
    }