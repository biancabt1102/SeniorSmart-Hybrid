import api from '../../services/api';

export async function criarPergunta(pergunta) {
    try {
        await api.post(`/pergunta`, {
            pergunta: pergunta,
        });
    } catch (error) {
        console.log(error)
    }
}
