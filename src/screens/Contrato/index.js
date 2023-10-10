import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Texto from "../../components/Texto";
import estilos from "./styles";
import Home from "../Home";

export default function Contrato() {
  // Obtém o objeto de navegação
  const navigation = useNavigation();
  const conteudo =
    "Parabéns! Você acaba de adquirir um dos nossos planos e agora tem acesso ilimitado a todas as funcionalidades do nosso chat bot. Estamos aqui para ajudá-lo em suas tarefas tecnológicas e tornar sua experiência ainda mais agradável. Conte conosco para descomplicar a tecnologia e facilitar sua vida. Obrigado por fazer parte da nossa comunidade!";

  return (
    <View style={estilos.container}>
      {/* Renderiza o componente Home com o conteúdo fornecido */}
      <Home conteudo={conteudo} continuacao={false} />

      {/* Botão para navegar para a tela de login */}
      <TouchableOpacity
        style={estilos.botoes}
        onPress={() => {
          // Navega para a tela de login e passa parâmetros
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }] // Troque 'Home' pelo nome da sua tela inicial
          });
        }}>
        <Texto style={estilos.textos}>Faça Login</Texto>
      </TouchableOpacity>
    </View>
  );
}
