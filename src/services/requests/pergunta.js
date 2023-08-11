import api from '../../services/api';
import { obterToken } from '../../components/TokenManager';

export async function criarPergunta(pergunta) {
    try {
        const response = await api.post(`/pergunta`, {
            pergunta: pergunta,
        }, {
            headers: {
                Authorization: `Bearer ${await obterToken()}`
            }
        });

        if (response.status === 201 && response.data && response.data.id) {
            return response.data.id;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function buscarTodasPerguntas() {
    try {
        const response = await api.get(`/pergunta`, {
            headers: {
                Authorization: `Bearer ${await obterToken()}`
            }
        });

        if (response.status === 200) {
            return response.data; // Retorna a lista de todas as perguntas
        } else {
            return null; // Retorno nulo em caso de erro
        }
    } catch (error) {
        console.log(error);
        return null; // Retorno nulo em caso de erro
    }
}