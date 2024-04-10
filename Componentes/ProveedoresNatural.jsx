import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Button,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { Divider, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import basura from "../assets/imgs/basura.png";
import boligrafo from "../assets/imgs/boligrafo.png";
import ubicacion from "../assets/imgs/ubicacion.png";
import phone from "../assets/imgs/ring-phone.png";
import x from "../assets/imgs/error.png";
import agregar from "../assets/imgs/boton-agregar.png";

const ProveedoresNatural = () => {
  const [providers, setProviders] = useState([]);
  const [newProvider, setNewProvider] = useState({
    identifierType: "",
    identifierNumber: "",
    name: "",
    emailAddress: "",
    productType: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providerAddresses, setProviderAddresses] = useState({});
  const [providerPhones, setProviderPhones] = useState({});
  const navigation = useNavigation(); // Obtener objeto de navegación

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await axios.get(`https://localhost:7028/api/providers`);
      const providersData = await Promise.all(
        response.data.map(async (provider) => {
          const addressResponse = await axios.get(
            `https://localhost:7028/api/providers/${provider.providerID}/addresses`
          );
          const phoneResponse = await axios.get(
            `https://localhost:7028/api/providers/${provider.providerID}/phones`
          );
          return {
            ...provider,
            addresses: addressResponse.data,
            phones: phoneResponse.data,
          };
        })
      );
      // Actualiza el estado de providerPhones después de completar el bucle
      const phonesData = {};
      providersData.forEach((provider) => {
        phonesData[provider.providerID] = provider.phones;
      });
      setProviderPhones(phonesData);
      setProviders(providersData);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  const handleAdrressClick = (providerID) => {
    navigation.navigate("AddressProviders", { providerID });
  };

  const handlePhonesClick = (providerID) => {
    navigation.navigate("PhonesProviders", { providerId: providerID });
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Tipo de Identificacion:</Text>
        <Text style={styles.cardText}>{item.identifierType}</Text>
        <Text style={styles.cardTitle}>Numero de Identificacion:</Text>
        <Text style={styles.cardText}>{item.identifierNumber}</Text>
        <Text style={styles.cardTitle}>Nombre :</Text>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardTitle}>Correo electronico:</Text>
        <Text style={styles.cardText}>{item.emailAddress}</Text>
        <Text style={styles.cardTitle}>Tipo de Producto:</Text>
        <Text style={styles.cardText}>{item.productType}</Text>
        <Text style={styles.cardTitle}>Direcciones:</Text>
        {providerAddresses[item.providerID]?.map((address, index) => (
          <Text key={index} style={styles.cardText}>
            {address}
          </Text>
        ))}
        <Text style={styles.cardTitle}>Teléfonos:</Text>
        {providerPhones[item.providerID]?.map((phone, index) => (
          <Text key={index} style={styles.cardText}>
            {phone.phoneType}: {phone.phoneNumber}
          </Text>
        ))}
        <Divider />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleUpdate(item)}
          >
            <Image source={boligrafo} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDeleteProvider(item.providerID)}
          >
            <Image source={basura} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleAdrressClick(item.providerID)}
          >
            <Image source={ubicacion} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePhonesClick(item.providerID)}
          >
            <Image source={phone} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      // Reset newProvider state when opening the modal to add a new provider
      setNewProvider({
        identifierType: "",
        identifierNumber: "",
        name: "",
        emailAddress: "",
        productType: "",
      });
    }
  };

  const handleInputChange = (key, value) => {
    setNewProvider((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleCreateProvider = async () => {
    try {
      await axios.post(`https://localhost:7028/api/providers`, newProvider);
      fetchProviders();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error creating provider:", error);
    }
  };

  const handleUpdateProvider = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/providers/${selectedProvider.providerID}`,
        newProvider
      );
      fetchProviders();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };

  const handleDeleteProvider = async (id) => {
    try {
      await axios.delete(`https://localhost:7028/api/providers/${id}`);
      fetchProviders();
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  const handleUpdate = (provider) => {
    setSelectedProvider(provider);
    setIsModalVisible(true); // Open modal for editing
  };

  useEffect(() => {
    if (selectedProvider) {
      setNewProvider(selectedProvider); // Set newProvider state with selected provider data
    }
  }, [selectedProvider]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Proveedores Actuales</Text>
        <FlatList
          data={providers}
          renderItem={renderItem}
          keyExtractor={(item) => item.providerID.toString()}
        />
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Image source={agregar} style={styles.icon} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Identificacion"
              value={newProvider.identifierType}
              onChangeText={(text) => handleInputChange("identifierType", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Numero de Identificacion"
              value={newProvider.identifierNumber}
              onChangeText={(text) =>
                handleInputChange("identifierNumber", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newProvider.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              value={newProvider.emailAddress}
              onChangeText={(text) => handleInputChange("emailAddress", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo de Producto"
              value={newProvider.productType}
              onChangeText={(text) => handleInputChange("productType", text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={
                selectedProvider ? handleUpdateProvider : handleCreateProvider
              }
            >
              <Image source={boligrafo} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Image source={x} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTotal: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  logo: {
    width: "25%",
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
  },
  titleLogo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardText: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 50,
  },
});

export default ProveedoresNatural;
