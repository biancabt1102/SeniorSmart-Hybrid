import api from '../api';
import { obterToken } from '../../components/TokenManager';

export async function buscaUsuario(idUsuario) {
  try {
    const response = await api.get(`/pagamentos/${idUsuario}`, {
      headers: {
        Authorization: `Bearer ${await obterToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function cadastrarPagamento(
  nomeCartao,
  numeroCartao,
  validade,
  cvv,
  planoid,
  tipoPlano,
  planoMensal,
  planoAnual
) {
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
    const response = await api.get(`/pagamentos/buscarPorPlano/${idPlano}`, {
      headers: {
        Authorization: `Bearer ${await obterToken()}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function editarPagamento(
  idUsuario,
  nomeCartao,
  numeroCartao,
  validade,
  cvv,
  planoid,
  tipoPlano,
  planoMensal,
  planoAnual
) {
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

    const response = await api.put(`/pagamentos/${idUsuario}`, requestBody, {
      headers: {
        Authorization: `Bearer ${await obterToken()}`
      }
    });

    if (response.status === 200) {
      return 'sucesso';
    } else {
      return 'erro';
    }
  } catch (error) {
    console.log(error);
    return 'erro';
  }
}

