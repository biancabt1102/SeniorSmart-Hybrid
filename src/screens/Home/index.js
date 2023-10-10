import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import AuthContext from "../../components/AuthContext";
import BemVindo from "../../components/BemVindo";
import Texto from "../../components/Texto";
import HomeStyles from "./styles";
import Header from "../../components/Header";

const Home = ({ conteudo = null, continuacao = true, voltar= false }) => {
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Chatbot");
    }
  }, [isLoggedIn, navigation]);

  return (
    <ScrollView>
      <Header voltar={voltar}/>
      <BemVindo conteudo={conteudo} continuacao={continuacao} />
      {!!continuacao === true && (
        <View style={HomeStyles.conteudo}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
            style={HomeStyles.botoes}
          >
            <Texto style={HomeStyles.textos}>Criar conta</Texto>
          </TouchableOpacity>
          <Texto style={HomeStyles.separacao}>ou</Texto>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={HomeStyles.botoes}
          >
            <Texto style={HomeStyles.textos}>Realizar login</Texto>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default Home;
