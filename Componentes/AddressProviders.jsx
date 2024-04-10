import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, Modal, FlatList } from "react-native";
import axios from "axios";

const Address = ({ providerID }) => {
  const [addressProviders, setAddressProviders] = useState([]);
  const [newAddressProvider, setNewAddressProvider] = useState({
    Address: "",
    AddressType: "",
    NeighborhoodId: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");

  useEffect(() => {
    const fetchAddressProviders = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/providers/${providerID}/addresses`
        );
        setAddressProviders(response.data);
      } catch (error) {
        console.error("Error fetching AddressProviders:", error);
      }
    };
    fetchAddressProviders();
  }, [providerID]);

  const handleCreateAddressProvider = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/providers/${providerID}/addresses`,
        newAddressProvider
      );
      setAddressProviders([...addressProviders, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating Address:", error);
    }
  };

  const handleShowModal = (action) => {
    setModalAction(action);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAddressProvider({
      Address: "",
      AddressType: "",
      NeighborhoodId: "",
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Direcciones Proveedores</Text>
      <Button
        title="Nueva Dirección"
        onPress={() => handleShowModal("create")}
      />
      <FlatList
        data={addressProviders}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Address}</Text>
            <Text>{item.AddressType}</Text>
            <Text>{item.NeighborhoodId}</Text>
          </View>
        )}
        keyExtractor={(item) => item.addressProviderId.toString()}
      />
      <Modal visible={showModal} animationType="slide">
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            {modalAction === "create"
              ? "Nueva dirección"
              : "Actualizar dirección"}
          </Text>
          <TextInput
            placeholder="Dirección"
            value={newAddressProvider.Address}
            onChangeText={(text) =>
              setNewAddressProvider({ ...newAddressProvider, Address: text })
            }
          />
          <TextInput
            placeholder="Tipo de dirección"
            value={newAddressProvider.AddressType}
            onChangeText={(text) =>
              setNewAddressProvider({
                ...newAddressProvider,
                AddressType: text,
              })
            }
          />
          <TextInput
            placeholder="ID de Barrio"
            value={newAddressProvider.NeighborhoodId}
            onChangeText={(text) =>
              setNewAddressProvider({
                ...newAddressProvider,
                NeighborhoodId: text,
              })
            }
          />
          <Button title="Cancelar" onPress={handleCloseModal} />
          <Button
            title={modalAction === "create" ? "Crear" : "Actualizar"}
            onPress={handleCreateAddressProvider}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Address;
