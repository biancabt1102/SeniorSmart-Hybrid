import api from "../../services/api";
import { obterToken } from '../../components/TokenManager'; // Certifique-se de importar corretamente a função para obter o token

export async function criarResposta(resposta, idPergunta, pergunta) {
    try {
        const response = await api.post(`/resposta`, {
            resposta: resposta,
            pergunta: {
                id: idPergunta,
                pergunta: pergunta
            }
        }, {
            headers: {
                Authorization: `Bearer ${await obterToken()}`
            }
        });

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

export async function buscarTodasRespostas() {
    try {
        const response = await api.get(`/resposta`, {
            headers: {
                Authorization: `Bearer ${await obterToken()}`
            }
        });

        if (response.status === 200) {
            return response.data; // Retorna a lista de todas as respostas
        } else {
            return null; // Retorno nulo em caso de erro
        }
    } catch (error) {
        console.log(error);
        return null; // Retorno nulo em caso de erro
    }
}