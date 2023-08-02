import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Entrar from '../components/Entrar';
import PlanoComTeste from '../screens/PlanoComTeste';
import Contrato from '../screens/Contrato/indes';
import Chatbot from '../screens/Chatbot';
import Pagamento from '../screens/Pagamento';
import Modelo from '../components/Modelo';
import Perfil from '../screens/Perfil';
import EditarDados from '../screens/EditarDados';
import EditarCartao from '../screens/EditarCartao';
import MudarSenha from '../screens/MudarSenha';
import ExcluirConta from '../screens/ExcluirConta';
import SairConta from '../screens/SairConta';
import PerfilInvalido from '../components/PerfilInvalido';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Entrar" component={Entrar} />
            <Stack.Screen name="PlanoComTeste" component={PlanoComTeste} />
            <Stack.Screen name="Contratado" component={Contrato} />
            <Stack.Screen name="Chatbot" component={Chatbot} />
            <Stack.Screen name="Modelo" component={Modelo} />
            <Stack.Screen name="Pagamento" component={Pagamento} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="EditarDados" component={EditarDados} />
            <Stack.Screen name="EditarCartao" component={EditarCartao} />
            <Stack.Screen name="MudarSenha" component={MudarSenha} />
            <Stack.Screen name="ExcluirConta" component={ExcluirConta} />
            <Stack.Screen name="SairConta" component={SairConta} />
            <Stack.Screen name="Invalido" component={PerfilInvalido} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
  