import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { AuthProvider } from './src/components/AuthContext';
import AppRoutes from "./src/routes/AppRoutes";


function App() {
  return (
    <SafeAreaView style={estilo.tela}>
      <StatusBar />
      <AuthProvider>
        <AppRoutes/>
      </AuthProvider>
    </SafeAreaView>
  );
}

const estilo = StyleSheet.create({
  tela: {
    flex: 1,
  },
});

export default App;
