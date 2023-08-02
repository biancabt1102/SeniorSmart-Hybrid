import api from '../api';

export async function criarPlano(tipoPlano, planoMensal, planoAnual) {
    console.log(tipoPlano, planoMensal, planoAnual);
    try {
      const requestBody = {
        tipoPlano: tipoPlano,
        planoMensal: planoMensal,
        planoAnual: planoAnual,
      };
  
      const response = await api.post('/planos/cadastro', requestBody);
      
      // Acessar o ID da resposta
      const idDoPlano = response.data.id;
      console.log(idDoPlano);
  
      return idDoPlano;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
