import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import basura from "../assets/imgs/basura.png";
import boligrafo from "../assets/imgs/boligrafo.png";
import agregar from "../assets/imgs/boton-agregar.png";

const PhonesProviders = ({ route, navigation }) => {
  const { providerId } = route.params;
  const [providerPhones, setProviderPhones] = useState([]);
  const [newProviderPhone, setNewProviderPhone] = useState({
    PhoneType: "",
    PhoneNumber: "",
  });
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const fetchProviderPhones = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/providers/${providerId}/phones`
        );
        setProviderPhones(response.data);
      } catch (error) {
        console.error("Error fetching providerPhones", error);
      }
    };

    fetchProviderPhones();
  }, [providerId]);

  const handleCreateProviderPhone = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/providers/${providerId}/phones`,
        newProviderPhone
      );
      setProviderPhones([...providerPhones, response.data]);
      setNewProviderPhone({ PhoneType: "", PhoneNumber: "" });
      setShowCreateModal(false);
      // Actualizar la vista de Proveedores Naturales después de guardar el teléfono
      navigation.goBack();
    } catch (error) {
      console.error("Error creating phone", error);
    }
  };

  const handleDeleteProviderPhone = async (providerPhoneID) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/providers/${providerId}/phones/${providerPhoneID}`
      );
      setProviderPhones(
        providerPhones.filter(
          (phone) => phone.providerPhoneID !== providerPhoneID
        )
      );
    } catch (error) {
      console.error("Error deleting phone", error);
    }
  };

  const handleUpdateProviderPhone = async () => {
    try {
      if (!selectedPhone) {
        console.error("No phone selected for update");
        return;
      }
      const response = await axios.put(
        `https://localhost:7028/api/providers/${providerId}/phones/${selectedPhone.providerPhoneID}`,
        selectedPhone
      );
      const updatedPhones = providerPhones.map((phone) =>
        phone.providerPhoneID === selectedPhone.providerPhoneID
          ? response.data
          : phone
      );
      setProviderPhones(updatedPhones);
      setShowUpdateModal(false); // Cerrar el modal después de actualizar
      // Actualizar la vista de Proveedores Naturales después de actualizar el teléfono
      navigation.goBack();
    } catch (error) {
      console.error("Error updating phone", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>Tipo de Telefono: {item.phoneType}</Text>
      <Text>Numero Telefonico: {item.phoneNumber}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => handleDeleteProviderPhone(item.providerPhoneID)}
        >
          <Image source={basura} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedPhone(item); // Establecer el teléfono seleccionado
            setShowUpdateModal(true);
          }}
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
          data={providerPhones}
          renderItem={renderItem}
          keyExtractor={(item) =>
            item.providerPhoneID ? item.providerPhoneID.toString() : ""
          }
        />
      </View>

      <TouchableOpacity
        onPress={() => setShowCreateModal(true)}
        style={styles.addButton}
      >
        <Image source={agregar} style={styles.icon} />
      </TouchableOpacity>

      <Modal visible={showCreateModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Nuevo Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el tipo de teléfono..."
            value={newProviderPhone.PhoneType}
            onChangeText={(text) =>
              setNewProviderPhone({ ...newProviderPhone, PhoneType: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese el número de teléfono..."
            value={newProviderPhone.PhoneNumber}
            onChangeText={(text) =>
              setNewProviderPhone({ ...newProviderPhone, PhoneNumber: text })
            }
          />
          <View style={styles.modalButtons}>
            <Button
              title="Cancelar"
              onPress={() => setShowCreateModal(false)}
            />
            <Button title="Crear" onPress={handleCreateProviderPhone} />
          </View>
        </View>
      </Modal>
      <Modal visible={showUpdateModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el tipo de teléfono..."
            value={selectedPhone ? selectedPhone.PhoneType : ""}
            onChangeText={(text) =>
              setSelectedPhone({ ...selectedPhone, PhoneType: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese el número de teléfono..."
            value={selectedPhone ? selectedPhone.PhoneNumber : ""}
            onChangeText={(text) =>
              setSelectedPhone({ ...selectedPhone, PhoneNumber: text })
            }
          />
          <View style={styles.modalButtons}>
            <Button
              title="Cancelar"
              onPress={() => setShowUpdateModal(false)}
            />
            <Button title="Guardar" onPress={handleUpdateProviderPhone} />
          </View>
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

export default PhonesProviders;
