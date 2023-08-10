import AsyncStorage from '@react-native-async-storage/async-storage';

export async function obterToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log('Erro ao obter o token:', error);
    return null;
  }
}
