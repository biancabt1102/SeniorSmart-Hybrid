import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function buscaUsuario(idUsuario) {
  try {
      const resultado = await api.get(`/pagamentos/${idUsuario}`);
      return resultado;
  } catch (error) {
      console.log(error)
      return''
  }
}

export async function cadastrarPagamento(nomeCartao, numeroCartao, validade, cvv, planoid, tipoPlano, planoMensal, planoAnual) {
  console.log(nomeCartao, numeroCartao, validade, cvv, planoid, tipoPlano, planoMensal, planoAnual);
  try {
    const requestBody = {
      nomeNoCartao: nomeCartao,
      numeroDoCartao: numeroCartao,
      validadeDoCartao: validade,
      codigoDoCartao: cvv,
      plano: {
        id: planoid,
        tipoPlano: tipoPlano,
        planoMensal: planoMensal,
        planoAnual: planoAnual
      }
    };

    const response = await api.post('/pagamentos/cadastro', requestBody);

    if (response.status === 200 || response.status === 201) {
      return 'sucesso';
    } else {
      return 'erro';
    }
  } catch (error) {
    console.log(error);
    return 'erro';
  } 
}


export async function buscaPagamentoPlano(idPlano) {
  try {
    const response = await api.get(`/api/pagamentos/buscarPorPlano/${idPlano}`);
    return response.data; // Retorna somente os dados da resposta, excluindo o status e os cabeçalhos
  } catch (error) {
    console.log(error);
    return null;
  }
}

