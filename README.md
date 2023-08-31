# SeniorSmart - Chatbot de Assistência Tecnológica para Idosos

O projeto **SeniorSmart** é um aplicativo móvel que visa auxiliar idosos no uso da tecnologia por meio de um chatbot de assistência. O chatbot responde às perguntas dos idosos e fornece informações sobre tecnologia de maneira acessível e compreensível. O aplicativo possui recursos como salvar contatos, configurações de voz virtual e repetição da última mensagem.

## Instalação e Configuração

Antes de começar, certifique-se de que você tenha o **Node.js** e o **npm** instalados no seu sistema. A seguir, siga as etapas para configurar o projeto:

1. Clone o repositório do projeto:

git clone <URL_DO_REPOSITÓRIO>

2. Navegue até a pasta do projeto

3. Instale as dependências do projeto:

npm install

4. Adicione o endereço IP da API no arquivo `api.js`. Substitua `<Coloque seu endereço de ip>` pelo endereço correto:

```javascript
// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://<Coloque seu endereço de ip>:8080/api",
});

export default api;
```

5. Adicione a chave da OpenAI no arquivo Chatbot.js. Substitua <Chave da OPENAI> pela sua chave de API do OpenAI:

Chatbot.js
```
    {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer <Chave da OPENAI>', // Substitua pela sua chave de API do OpenAI
        },
    }
```

## Uso

Após configurar o projeto, você pode executar o aplicativo usando o seguinte comando:

npx react-native run-android

Isso iniciará o aplicativo e abrirá o ambiente de desenvolvimento. Você pode usar emuladores ou dispositivos físicos para testar o aplicativo.

## Recursos Adicionais

O aplicativo SeniorSmart oferece os seguintes recursos:

- Chatbot de Assistência Tecnológica: O chatbot responde às perguntas dos idosos sobre tecnologia de maneira compreensível e acessível.
- Salvar Contatos: Os idosos podem salvar contatos com facilidade, melhorando a usabilidade do aplicativo.
- Configurações de Voz Virtual: Os usuários podem escolher a velocidade da fala do chatbot.
- Repetição da Última Mensagem: Os idosos podem repetir a última mensagem do chatbot para melhor compreensão.

## Contribuição

Se você deseja contribuir para o projeto, sinta-se à vontade para enviar pull requests ou relatar problemas no repositório do projeto.

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE](./LICENSE) para obter mais detalhes.