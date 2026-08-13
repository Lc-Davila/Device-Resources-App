import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';
import { FontAwesome } from '@expo/vector-icons';

const ContactsComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status !== 'granted') {
        setPermissionDenied(true);
        Alert.alert('Permissão Negada', 'Permissão para acessar contatos foi negada.');
        setLoading(false);
        return;
      }

      setPermissionDenied(false);

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      });

      // Verifica se há contatos
      if (data.length > 0) {
        setContacts(data); // Atualiza o estado com os contatos obtidos
      } else {
        Alert.alert('Sem Contatos', 'Nenhum contato encontrado.');
      }
    } catch (error) {
      // Trata possíveis erros na obtenção dos contatos
      Alert.alert('Erro', 'Ocorreu um erro ao carregar os contatos.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Executa a função de carregar contatos quando o componente é montado
  useEffect(() => {
    loadContacts();
  }, []);

  // Função para renderizar cada item da lista de contatos
  const renderItem = ({ item }) => (
    <View style={styles.contactItem}>
      {/* Nome completo do contato */}
      <Text style={styles.contactName}>
        {item.firstName || item.name} {item.lastName || ''}
      </Text>

      {/* Lista de números de telefone do contato */}
      {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
        <View key={index} style={styles.contactDetailContainer}>
          <FontAwesome name="phone" size={16} color="#555" style={styles.icon} />
          <Text style={styles.contactDetail}>{phone.number}</Text>
        </View>
      ))}

      {/* Lista de emails do contato */}
      {item.emails && item.emails.map((email, index) => (
        <View key={index} style={styles.contactDetailContainer}>
          <FontAwesome name="envelope" size={16} color="#555" style={styles.icon} />
          <Text style={styles.contactDetail}>{email.email}</Text>
        </View>
      ))}
    </View>
  );

  return (
    // contêiner principal com estilo de preenchimento
    <View style={styles.container}>
      <Text style={styles.title}>Contatos</Text>

      {/* botão para recarregar os contatos manualmente */}
      <Button title="Recarregar Contatos" onPress={loadContacts} />

      {/* mensagem exibida quando a permissão é negada */}
      {permissionDenied && (
        <Text style={styles.deniedText}>
          Sem acesso aos contatos. Conceda a permissão para continuar.
        </Text>
      )}

      {loading && <Text style={styles.loadingText}>Carregando contatos...</Text>}

      <FlatList
        data={contacts} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem} 
        contentContainerStyle={styles.list}
        initialNumToRender={15}
        removeClippedSubviews
      />
    </View>
  );
};

// define os estilos utilizados no componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee', 
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  contactDetail: {
    fontSize: 14,
    color: '#555',
  },
  icon: {
    marginRight: 10,
  },
  deniedText: {
    marginTop: 10,
    color: 'red',
  },
  loadingText: {
    marginTop: 10,
    color: '#888',
  },
});

export default ContactsComponent;
