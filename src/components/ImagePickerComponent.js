import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// define o componente funcional
const ImagePickerComponent = () => {
  // armazena a URI da imagem selecionada
  const [imageUri, setImageUri] = useState(null);
  // Estado para saber se a permissão foi negada
  const [permissionDenied, setPermissionDenied] = useState(false);

  // função pra solicitar permissão e abrir a galeria
  const selectImage = async () => {
    // solicita permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // verifica se a permissão foi concedida
    if (status !== 'granted') {
      setPermissionDenied(true);
      Alert.alert(
        'Permissão Negada',
        'Permissão para acessar a galeria foi negada. Você pode habilitá-la nas configurações do dispositivo.'
      );
      return;
    }

    setPermissionDenied(false);

    // abre a galeria para seleção de imagem
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      allowsEditing: true, // Permite edição básica
      quality: 1, // Qualidade da imagem (1 é a melhor)
    });

    // verifica se o usuário cancelou a operação
    if (result.canceled) {
      Alert.alert('Operação Cancelada', 'Você cancelou a seleção de imagem.');
      return;
    }

    // define a URI da imagem selecionada no estado
    setImageUri(result.assets[0].uri);
  };

  return (
    // contêiner principal
    <View style={styles.container}>
      <Text style={styles.title}>Galeria de Imagens</Text>

      {/* botão para selecionar imagem */}
      <Button title="Selecionar Imagem" onPress={selectImage} />

      {/* mensagem exibida quando a permissão é negada */}
      {permissionDenied && (
        <Text style={styles.deniedText}>
          Sem acesso à galeria. Conceda a permissão para continuar.
        </Text>
      )}

      {/* exibe a imagem selecionada, se houver */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }} // Fonte da imagem
          style={styles.image} // Estilo da imagem
        />
      )}
    </View>
  );
};

// define os estilos utilizados no componente
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200, 
    height: 200, 
    marginTop: 20,
    borderRadius: 10,
  },
  deniedText: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
});

export default ImagePickerComponent;