# SeniorSmart - Chatbot de Assistência Tecnológica para Idosos

O projeto **SeniorSmart** é um aplicativo móvel que visa auxiliar idosos no uso da tecnologia por meio de um chatbot de assistência. O chatbot responde às perguntas dos idosos e fornece informações sobre tecnologia de maneira acessível e compreensível. O aplicativo possui recursos como salvar contatos, configurações de voz virtual e repetição da última mensagem.

## Protótipo funcional da aplicação

[Vídeo do protótipo](https://www.youtube.com/watch?v=HAWacXQwmb4)

## Instalação e Configuração

Antes de começar, certifique-se de que você tenha o **Node.js** e o **npm** instalados no seu sistema. A seguir, siga as etapas para configurar o projeto:

1. Clone o repositório do projeto:

`git clone <URL_DO_REPOSITÓRIO>`

2. Navegue até a pasta do projeto

3. Instale as dependências do projeto:

`npm install`

4. Adicione o endereço IP da API no arquivo `api.js`. Substitua `<Coloque seu endereço de ip>` pelo endereço correto para rodar a API no emulador:

```javascript
// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://<Coloque seu endereço de ip>:8080/api",
});

export default api;
```

5. Adicione a chave da OpenAI no acomponente do Chatbot, chamado de OpenAIService.js. Substitua <Chave da OPENAI> pela sua chave de API do OpenAI:

OpenAIService.js
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

`npx react-native run-android`

Isso iniciará o aplicativo e abrirá o ambiente de desenvolvimento. Você pode usar emuladores ou dispositivos físicos para testar o aplicativo.


## Testes/Mudanças no *application.properties* da API

Você pode testar o front com o Back, basta usar o código de Digital e fazer as devidas mudanças que quiser:
- Caso querira testar a aplicação sem o token, basta habilitar o modo dev descomentando: ```#spring.profiles.active=dev```
- Caso queira testar essa aplicação junto com a aplicação de hybrid, o react native dela, adicione: ```server.address=seu ip```, assim o react_native encontrara o caminho da aplicação.
- Essa aplicação também possui o ```/swagger-ui/index.html#/``` como documentação.
- Link da API de Digital: https://github.com/biancabt1102/SeniorSmart-digital

## Recursos Adicionais

O aplicativo SeniorSmart oferece os seguintes recursos:

- Chatbot de Assistência Tecnológica: O chatbot responde às perguntas dos idosos sobre tecnologia de maneira compreensível e acessível.
- Salvar Contatos: Os idosos podem salvar contatos com facilidade, melhorando a usabilidade do aplicativo.
- Configurações de Voz Virtual: Os usuários podem escolher a velocidade da fala do chatbot.
- Repetição da Última Mensagem: Os idosos podem repetir a última mensagem do chatbot para melhor compreensão.

## Contribuição

Se você deseja contribuir para o projeto, sinta-se à vontade para enviar pull requests ou relatar problemas no repositório do projeto. Esse projeto ainda se encontra em construção.

## Licença

Este projeto é licenciado sob a Licença MIT - consulte o arquivo [LICENSE](./LICENSE) para obter mais detalhes.
