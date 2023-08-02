import api from "../../services/api";

export async function criarResposta(resposta) {
    try {
        await api.post(`/resposta/`, {
            resposta: resposta
        });
    } catch (error) {
        console.log(error)
    }
}