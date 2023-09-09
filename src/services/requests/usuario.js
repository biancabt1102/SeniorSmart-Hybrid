import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obterToken } from '../../components/TokenManager';

//Cadastro
export async function cadastrarUsuario(
  nomeUsuario, 
  emailUsuario, 
  senhaUsuario, 
  confirmarSenhaUsuario, 
  nascimentoUsuario, 
  telefoneUsuario, 
  planoid, 
  tipoPlano, 
  planoMensal, 
  planoAnual
  ) {
  
  try {
    const requestBody = {
      nome: nomeUsuario,
      email: emailUsuario,
      senha: senhaUsuario,
      confirmarSenha: confirmarSenhaUsuario,
      data: nascimentoUsuario,
      telefone: telefoneUsuario,
      plano: {
        id: planoid,
        tipoPlano: tipoPlano,
        planoMensal: planoMensal,
        planoAnual: planoAnual
      }
    };
    
    const response = await api.post('/usuarios/cadastro', requestBody);

    // Verifica se a resposta da API contém um campo "data" (caso específico da biblioteca axios)
    if (response.data) {
      return response.data.id;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao cadastrar o usuário:', error);
    return null;
  } 
}

//Login
export async function loginUsuario(
  emailUsuario, 
  senhaUsuario
  ) {
  
  try {
    const requestBody = {
      email: emailUsuario,
      senha: senhaUsuario
    };
    
    const response = await api.post('/usuarios/login', requestBody);
    const token = response.data.token;

    // Salva o token no AsyncStorage
    await salvarToken(token);

    return token;
  } catch (error) {
    console.log(error);
    return null;
  } 
}

//Salva o Token
export async function salvarToken(token) {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token salvo com sucesso!');
  } catch (error) {
    console.log('Erro ao salvar o token:', error);
  }
}

// Buscar usuário por ID
export async function buscaUsuarioPorId(idUsuario) {
  try {
    const token = await obterToken();
    if (token) {
      const response = await api.get(`/usuarios/${idUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } else {
      console.log('Token não encontrado.');
      return null;
    }
  } catch (error) {
    console.log('Erro na busca do usuário por ID:', error);
    return null;
  }
}

//Get por E-mail
export async function buscaUsuarioEmail(emailUsuario) {
  try {
    const token = await obterToken();
    if (token) {
      const response = await api.get(`/usuarios/email?email=${emailUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } else {
      console.log('Token não encontrado.');
      return null;
    }
  } catch (error) {
    console.log('Erro na busca do usuário por email:', error);
    return null;
  }
}

// Get por ID do Plano
export async function buscaUsuarioPorIdPlano(idPlano) {
  try {
    const token = await obterToken();
    if (token) {
      const response = await api.get(`/usuarios/plano/${idPlano}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } else {
      console.log('Token não encontrado.');
      return null;
    }
  } catch (error) {
    console.log('Erro na busca do usuário por ID do plano:', error);
    return null;
  }
}

//Update
export async function alterarUsuario(
  idUsuario,
  novoNomeUsuario,
  novoEmailUsuario,
  novaSenhaUsuario,
  novoConfirmarSenhaUsuario,
  novoNascimentoUsuario,
  novoTelefoneUsuario,
  novoPlanoid,
  novoTipoPlano,
  novoPlanoMensal,
  novoPlanoAnual
) {
  try {
    console.log(idUsuario);
    const requestBody = {
      nome: novoNomeUsuario,
      email: novoEmailUsuario,
      senha: novaSenhaUsuario,
      confirmarSenha: novoConfirmarSenhaUsuario,
      data: novoNascimentoUsuario,
      telefone: novoTelefoneUsuario,
      plano: {
        id: novoPlanoid,
        tipoPlano: novoTipoPlano,
        planoMensal: novoPlanoMensal,
        planoAnual: novoPlanoAnual
      }
    };

    const token = await obterToken();

    const response = await api.put(`/usuarios/${idUsuario}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`
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

// Deletar
export async function deletarUsuario(id) {
  try {
    const token = await obterToken();
    if (token) {
      await api.delete(`/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Usuário excluído com sucesso.');
      return "Sucesso";
    } else {
      console.log('Token não encontrado.');
      return "Erro: Token não encontrado";
    }
  } catch (error) {
    console.log('Erro na exclusão do usuário:', error);
    return `Erro: ${error.message}`;
  }
}