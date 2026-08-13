import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from 'react-native';
import ImagePickerComponent from './src/components/ImagePickerComponent';
import ContactsComponent from './src/components/ContactsComponent';

// Define o componente principal do aplicativo
const App = () => {
  return (
    // SafeAreaView para garantir que o conteúdo não ultrapasse áreas seguras do dispositivo
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* ScrollView para permitir rolagem caso o conteúdo exceda a tela */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Renderiza o componente de seleção de imagem */}
        <ImagePickerComponent />

        {/* Renderiza o componente de contatos */}
        <ContactsComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

// Define os estilos utilizados no aplicativo principal
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#f0f0f0', // Cor de fundo cinza claro
  },
  scrollContent: {
    flexGrow: 1,
  },
});

// Exporta o componente principal
export default App;
