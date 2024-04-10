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
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { Divider, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import basura from "../assets/imgs/basura.png";
import boligrafo from "../assets/imgs/boligrafo.png";
import carritocompras from "../assets/imgs/carrito-de-compras.png";
import x from "../assets/imgs/error.png";
import agregar from "../assets/imgs/boton-agregar.png";
import ubicacion from "../assets/imgs/ubicacion.png";
import phone from "../assets/imgs/ring-phone.png";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    identifierType: "",
    identifierNumber: "",
    name: "",
    email: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigation = useNavigation();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://localhost:7028/api/customers");
      const customersData = await Promise.all(
        response.data.map(async (customer) => {
          const addressResponse = await axios.get(
            `https://localhost:7028/api/customers/${customer.customerID}/addresses`
          );
          const phoneResponse = await axios.get(
            `https://localhost:7028/api/customers/${customer.customerID}/phones`
          );
          return {
            ...customer,
            addresses: addressResponse.data
              ? addressResponse.data.map((address) => address.address)
              : [],
            phones: phoneResponse.data
              ? phoneResponse.data.map((phone) => phone.phoneNumber)
              : [],
          };
        })
      );
      setCustomers(customersData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleCreateCustomer = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/customers`,
        newCustomer
      );

      setCustomers([response.data, ...customers]);

      setNewCustomer({
        identifierType: "",
        identifierNumber: "",
        name: "",
        email: "",
      });

      handleCloseModal();
    } catch (error) {
      console.error("error creating customer:", error);
    }
  };

  const handleUpdateCustomer = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/customers/${selectedCustomer.customerID}`,
        newCustomer
      );
      fetchCustomers();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`https://localhost:7028/api/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error("Error deleting provider:", error);
    }
  };

  const handleUpdate = (customer) => {
    setSelectedCustomer(customer);
    setIsModalVisible(true);
  };

  useEffect(() => {
    if (selectedCustomer) {
      setNewCustomer(selectedCustomer);
    }
  }, [selectedCustomer]);

  const handleTelefonosClick = (customerID) => {
    navigation.navigate("PhonesCustomer", { customerId: customerID }); // Pasar customerId como parámetro
  };
  const handleDirrecionesClick = (customerID) => {
    navigation.navigate("AddressCustomer", { customerId: customerID }); // Pasar customerId como parámetro
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Tipo de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierType}</Text>

        <Text style={styles.cardTitle}>Numero de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierNumber}</Text>

        <Text style={styles.cardTitle}>Nombre : </Text>
        <Text style={styles.cardText}>{item.name}</Text>

        <Text style={styles.cardTitle}>Correo electronico: </Text>
        <Text style={styles.cardText}>{item.email}</Text>

        <Text style={styles.cardTitle}>Direcciones: </Text>
        {item.addresses &&
          item.addresses.map((address, index) => (
            <Text key={index} style={styles.cardText}>
              {address}
            </Text>
          ))}

        <Text style={styles.cardTitle}>Teléfonos: </Text>
        {item.phones &&
          item.phones.map((phone, index) => (
            <Text key={index} style={styles.cardText}>
              {phone}
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
            onPress={() => handleDeleteCustomer(item.customerID)}
          >
            <Image source={basura} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDirrecionesClick(item.customerID)}
          >
            <Image source={ubicacion} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleTelefonosClick(item.customerID)}
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
      setNewCustomer({
        identifierType: "",
        identifierNumber: "",
        name: "",
        email: "",
      });
    }
  };

  const handleInputChange = (key, value) => {
    setNewCustomer({
      ...newCustomer,
      [key]: value,
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setNewCustomer({
      identifierType: "",
      identifierNumber: "",
      name: "",
      email: "",
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Clientes Actuales</Text>
        <FlatList
          data={customers}
          renderItem={renderItem}
          keyExtractor={(item) => item.customerID.toString()}
        />
        <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
          <Image source={agregar} style={styles.icon} />
        </TouchableOpacity>
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tipo de Identificacion"
              value={newCustomer.identifierType}
              onChangeText={(text) => handleInputChange("identifierType", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Numero de Identificacion"
              value={newCustomer.identifierNumber}
              onChangeText={(text) =>
                handleInputChange("identifierNumber", text)
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={newCustomer.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo electronico"
              value={newCustomer.email}
              onChangeText={(text) => handleInputChange("email", text)}
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                onPress={
                  selectedCustomer ? handleUpdateCustomer : handleCreateCustomer
                }
                style={[styles.button, styles.actionButton]}
              >
                <Image source={boligrafo} style={styles.icon} />
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCloseModal}
              >
                <Image source={x} style={styles.icon} />
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
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
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#007bff",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
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

export default Customers;
