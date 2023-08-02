import api from '../api';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function buscaUsuarioEmail(emailUsuario, token) {
  try {
    const response = await api.get(`/usuarios/email?email=${emailUsuario}`, {
      headers: {
        Authorization: `Bearer ${token}` // Envia o token no cabeçalho 'Authorization' usando o padrão Bearer
      }
    });
    return response.data; // Retorna somente os dados da resposta, excluindo o status e os cabeçalhos
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function buscaUsuarioPorIdPlano(idPlano, token) {
  try {
    const response = await api.get(`/usuarios/por-plano?idPlano=${idPlano}`, {
      headers: {
        Authorization: `Bearer ${token}` // Envia o token no cabeçalho 'Authorization' usando o padrão Bearer
      }
    });
    console.log(response.data);
    return response.data; // Retorna somente os dados da resposta, excluindo o status e os cabeçalhos
  } catch (error) {
    console.log(error);
    return null;
  }
}
 
export async function cadastrarUsuario(nomeUsuario, emailUsuario, senhaUsuario, confirmarSenhaUsuario, nascimentoUsuario, telefoneUsuario, planoid, tipoPlano, planoMensal, planoAnual) {
  console.log(nomeUsuario, emailUsuario, senhaUsuario, confirmarSenhaUsuario, nascimentoUsuario, telefoneUsuario, planoid, tipoPlano, planoMensal, planoAnual);
  
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
      return 'sucesso';
    } else {
      return 'erro';
    }
  } catch (error) {
    console.log(error);
    return 'erro';
  } 
}

export async function loginUsuario(emailUsuario, senhaUsuario) {
  console.log(emailUsuario, senhaUsuario);
  
  try {
    const requestBody = {
      email: emailUsuario,
      senha: senhaUsuario
    };
    
    const response = await axios.post('/usuarios/login', requestBody);
    const token = response.data.token;
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
    return null;
  } 
}




export async function alterarUsuario(id, nome, email, senha, confirmarSenha, telefone, data) {
  try {
      await api.put(`/usuarios/${id}`, {
        nome: nome,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha,
        telefone: telefone,
        data: data
      });
      return 'sucesso'
  } catch (error) {
      console.log(error)
      return 'erro'
  }
}

export async function deletarUsuario(id) {
  try {
      await api.delete(`/usuarios/${id}`);
      return 'sucesso'
  } catch (error) {
      console.log(error)
      return 'erro'
  }
}
