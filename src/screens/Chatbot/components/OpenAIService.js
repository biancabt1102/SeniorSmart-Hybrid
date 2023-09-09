import axios from 'axios';

const OpenAIService = {
  async enviarMensagem(message, nomeUsuario, deviceModel) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Seu nome é Sexta-feira e você trabalha para a Seniorsmart ajudando idosos. Você é um assistente útil. Explique as coisas de um modo fácil pois está falando com um idoso, o nome da pessoa é ${nomeUsuario}. Modelo do meu celular é o ${deviceModel}.`,
            },
            { role: 'user', content: message },
          ],
          max_tokens: 4000, // Substitua pelo número adequado de tokens de resposta
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <Chave da OPENAI>', // Substitua pela sua chave de API do OpenAI
          },
        }
      );

      if (response.status === 200) {
        return response.data.choices[0].message.content.trim();
      } else {
        console.error('Erro ao chamar a API do GPT');
        return null;
      }
    } catch (error) {
      console.error('Erro ao chamar a API do GPT:', error);
      return null;
    }
  },
};

export default OpenAIService;
