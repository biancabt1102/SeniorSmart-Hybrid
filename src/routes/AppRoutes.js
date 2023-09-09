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
import EditarDados from '../screens/EditarDados';
import EditarCartao from '../screens/EditarCartao';
import MudarSenha from '../screens/MudarSenha';
import ExcluirConta from '../screens/ExcluirConta';
import SairConta from '../screens/SairConta';


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
        <Stack.Screen name="Editar Dados" component={EditarDados} />
        <Stack.Screen name="Editar Cartao" component={EditarCartao} />
        <Stack.Screen name="Mudar Senha" component={MudarSenha} />
        <Stack.Screen name="Excluir Conta" component={ExcluirConta} />
        <Stack.Screen name="Sair Conta" component={SairConta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRoutes;
