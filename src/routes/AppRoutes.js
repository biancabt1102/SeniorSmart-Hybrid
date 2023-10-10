import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import PlanoComTeste from '../screens/PlanoComTeste';
import Contrato from '../screens/Contrato';
import Pagamento from '../screens/Pagamento';
import PerfilInvalido from '../components/PerfilInvalido';
import Login from '../screens/Login';
import Chatbot from '../screens/Chatbot';
import Perfil from '../screens/Perfil';
import EdicaoDados from '../screens/EdicaoDados';
import EdicaoCartao from '../screens/EdicaoCartao';
import MudaSenha from '../screens/MudaSenha';
import ExclusaoConta from '../screens/ExclusaoConta';
import SaidaDaConta from '../screens/SaidaDaConta';


const Stack = createNativeStackNavigator();

/**
 * Componente de navegação principal do aplicativo.
 */
function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro}/>
        <Stack.Screen name="PlanoComTeste" component={PlanoComTeste} />
        <Stack.Screen name="Contrato" component={Contrato} />
        <Stack.Screen name="Pagamento" component={Pagamento} />
        <Stack.Screen name="Invalido" component={PerfilInvalido} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Editar Dados" component={EdicaoDados} />
        <Stack.Screen name="Editar Cartao" component={EdicaoCartao} />
        <Stack.Screen name="Mudar Senha" component={MudaSenha} />
        <Stack.Screen name="Excluir Conta" component={ExclusaoConta} />
        <Stack.Screen name="Sair Conta" component={SaidaDaConta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
