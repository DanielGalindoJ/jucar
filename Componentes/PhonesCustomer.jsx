import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import basura from "../assets/imgs/basura.png";
import boligrafo from "../assets/imgs/boligrafo.png";
import agregar from "../assets/imgs/boton-agregar.png";

const CustomersPhones = ({ route, navigation }) => {
  const { customerId } = route.params;
  const [customersPhone, setCustomersPhone] = useState([]);
  const [newCustomerPhone, setNewCustomerPhone] = useState({
    PhoneType: "",
    PhoneNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedCustomerPhoneId, setSelectedCustomerPhoneId] = useState(null);

  useEffect(() => {
    const fetchCustomersPhone = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/customers/${customerId}/phones`
        );
        setCustomersPhone(response.data);
      } catch (error) {
        console.error("Error fetching customers phone", error);
      }
    };
    fetchCustomersPhone();
  }, [customerId]);

  const handleCreateCustomerPhone = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/customers/${customerId}/phones`,
        newCustomerPhone
      );
      setCustomersPhone([...customersPhone, response.data]);
      setNewCustomerPhone({ PhoneType: "", PhoneNumber: "" });
      setShowModal(false); // Cerrar el modal después de crear el teléfono
    } catch (error) {
      console.error("Error creating phone", error);
    }
  };

  const handleUpdateCustomerPhone = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7028/api/customers/${customerId}/phones/${selectedCustomerPhoneId}`,
        newCustomerPhone
      );
      const updatedPhones = customersPhone.map((phone) =>
        phone.customerPhoneID === selectedCustomerPhoneId
          ? response.data
          : phone
      );
      setCustomersPhone(updatedPhones);
      setShowModal(false); // Cerrar el modal después de actualizar el teléfono
    } catch (error) {
      console.error("Error updating phone", error);
    }
  };

  const handleDeleteCustomerPhone = async (customerPhoneId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/customers/${customerId}/phones/${customerPhoneId}`
      );
      const updatedPhones = customersPhone.filter(
        (phone) => phone.customerPhoneID !== customerPhoneId
      );
      setCustomersPhone(updatedPhones);
    } catch (error) {
      console.error("Error deleting phone:", error);
    }
  };

  const handleShowCreateModal = () => {
    setModalAction("create");
    setShowModal(true);
  };

  const handleShowEditModal = (customerPhoneId) => {
    setModalAction("edit");
    setSelectedCustomerPhoneId(customerPhoneId);
    const selectedCustomerPhone = customersPhone.find(
      (phone) => phone.customerPhoneID === customerPhoneId
    );
    if (selectedCustomerPhone) {
      setNewCustomerPhone({
        PhoneType: selectedCustomerPhone.phoneType || "",
        PhoneNumber: selectedCustomerPhone.phoneNumber || "",
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCustomerPhone({ PhoneType: "", PhoneNumber: "" });
    setSelectedCustomerPhoneId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>Tipo de Telefono: {item.phoneType}</Text>
      <Text>Numero Telefonico: {item.phoneNumber}</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => handleDeleteCustomerPhone(item.customerPhoneID)}
        >
          <Image source={basura} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleShowEditModal(item.customerPhoneID)}
        >
          <Image source={boligrafo} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Telefonos</Text>
        <FlatList
          data={customersPhone}
          renderItem={renderItem}
          keyExtractor={(item) => item.customerPhoneID.toString()}
        />
      </View>
      <TouchableOpacity
        onPress={() => setShowCreateModal(true)}
        style={styles.addButton}
      >
        <Image source={agregar} style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View>
          <Text>
            {modalAction === "create"
              ? "Nuevo Teléfono"
              : "Actualizar Teléfono"}
          </Text>
          <TextInput
            placeholder="Tipo de Teléfono"
            value={newCustomerPhone.PhoneType}
            onChangeText={(text) =>
              setNewCustomerPhone({ ...newCustomerPhone, PhoneType: text })
            }
          />
          <TextInput
            placeholder="Número de Teléfono"
            value={newCustomerPhone.PhoneNumber}
            onChangeText={(text) =>
              setNewCustomerPhone({ ...newCustomerPhone, PhoneNumber: text })
            }
          />
          <Button
            title={modalAction === "create" ? "Crear" : "Actualizar"}
            onPress={
              modalAction === "create"
                ? handleCreateCustomerPhone
                : handleUpdateCustomerPhone
            }
          />
          <Button title="Cancelar" onPress={handleCloseModal} />
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
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
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "80%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CustomersPhones;
