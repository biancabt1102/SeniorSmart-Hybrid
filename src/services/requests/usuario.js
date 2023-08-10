import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obterToken } from '../../components/TokenManager'


 
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
    const idUsu = response.data.id;
    console.log("Id:" + idUsu);
    

    // Verifica se a resposta da API contém um campo "data" (caso específico da biblioteca axios)
    if (response.data) {
      return idUsu;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  } 
}

export async function loginUsuario(emailUsuario, senhaUsuario) {
  console.log(emailUsuario, senhaUsuario);
  
  try {
    const requestBody = {
      email: emailUsuario,
      senha: senhaUsuario
    };
    
    const response = await api.post('/usuarios/login', requestBody);
    const token = response.data.token;
    console.log(token);

    // Salva o token no AsyncStorage
    await salvarToken(token);

    return token;
  } catch (error) {
    console.log(error);
    return null;
  } 
}


export async function salvarToken(token) {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('Token salvo com sucesso!');
  } catch (error) {
    console.log('Erro ao salvar o token:', error);
  }
}

export async function buscaUsuarioEmail(emailUsuario) {
  try {
    const token = await obterToken();
    console.log("shimbalaie " + emailUsuario)
    if (token) {
      const response = await api.get(`/usuarios/email?email=${emailUsuario}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.nome)
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

export async function buscaUsuarioPorIdPlano(idPlano) {
  try {
    console.log(idPlano)
    const token = await obterToken();
    console.log(token)
    if (token) {
      const response = await api.get(`/usuarios/plano/${idPlano}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
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



export async function deletarUsuario(id) {
  try {
    const token = await obterToken();
    if (token) {
      await api.delete(`/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return 'sucesso';
    } else {
      console.log('Token não encontrado.');
      return 'erro';
    }
  } catch (error) {
    console.log('Erro na exclusão do usuário:', error);
    return 'erro';
  }
}