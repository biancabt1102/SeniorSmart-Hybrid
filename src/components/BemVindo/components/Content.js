import React from "react";
import { View } from "react-native";
import BemVindoStyles from "../styles";
import Texto from "../../Texto";

export default function BemVindoContent({ conteudo = null, continuacao = true }) {
    if (conteudo === null) {
        conteudo = "    Bem-vindo ao nosso chat bot! Aqui, você encontrará ajuda para tarefas básicas de tecnologia. Nosso objetivo é tornar a tecnologia mais acessível para todos, especialmente para a terceira idade. Sabemos que nem sempre é fácil lidar com smartphones, computadores e outros dispositivos tecnológicos, mas estamos aqui para ajudá-lo. Com o nosso chat bot, você aprenderá a instalar aplicativos, enviar e-mails, acessar redes sociais e muito mais! Nossa linguagem é simples e amigável, para que você se sinta confortável em cada passo do caminho. Não importa qual seja a sua dúvida, estaremos sempre à disposição para ajudar."
    }

  return (
    <View style={BemVindoStyles.conteudo}>
        <Texto style={BemVindoStyles.texto}>{conteudo}</Texto>

        {!!continuacao === true && <Texto style={BemVindoStyles.titulo}>Teste grátis</Texto>}
        
        {!!continuacao === true && <Texto style={BemVindoStyles.texto}>    Temos uma ótima notícia para você! Nosso chat bot oferece um plano mensal por apenas R$43.42, e um plano anual com um desconto ainda maior, por R$521.04. Com qualquer um dos planos, você terá acesso a todas as funcionalidades do nosso chat bot, além de suporte técnico por e-mail.
        E para que você possa experimentar nosso chat bot sem compromisso, oferecemos um teste gratuito de 1 semana para novos usuários. Isso mesmo, você pode testar nossas funcionalidades e aprender novas habilidades tecnológicas sem gastar um centavo.
        Acreditamos que a tecnologia deve estar ao alcance de todos, e é por isso que nossos planos são acessíveis e nossas orientações são fáceis de seguir. Com a ajuda do nosso chat bot, você poderá desfrutar de todas as vantagens da tecnologia de maneira descomplicada.
        Não perca mais tempo, experimente nosso chat bot e descubra como a tecnologia pode tornar sua vida mais fácil.</Texto>}
    </View>
  );
}

