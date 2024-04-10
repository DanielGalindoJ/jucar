import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import {
  Text,
  Button,
  Card,
  Divider,
  Provider,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";
import { Image } from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import basura from "../assets/imgs/basura.png";
import boligrafo from "../assets/imgs/boligrafo.png";
import agregar from "../assets/imgs/boton-agregar.png";
import x from "../assets/imgs/error.png";

const RawMaterials = ({ navigation }) => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [newRawMaterial, setNewRawMaterial] = useState({
    Name: "",
    Stock: {
      QuantityAvailable: "",
      InitialStock: 0,
      ReorderPoint: 0,
      MinimumInventory: 0,
      MaximumInventory: 0,
    },
  });
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/rawMaterials"
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching rawMaterials:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateRawMaterial = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7028/api/rawMaterials",
        newRawMaterial
      );

      setRawMaterials([response.data, ...rawMaterials]);
      setNewRawMaterial({
        Name: "",
        Stock: {
          QuantityAvailable: "",
          InitialStock: 0,
          ReorderPoint: 0,
          MinimumInventory: 0,
          MaximumInventory: 0,
        },
      });
    } catch (error) {
      console.error("Error creating rawMaterial:", error);
    }
  };

  const handleDeleteRawMaterial = async (rawMaterialId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/rawMaterials/${rawMaterialId}`
      );

      const updatedRawMaterials = rawMaterials.filter(
        (rawMaterial) => rawMaterial.rawMaterialId !== rawMaterialId
      );

      setRawMaterials(updatedRawMaterials);
      setShowDeleteModal(false); // Cerrar el portal de confirmación al eliminar
    } catch (error) {
      console.error("Error deleting rawMaterial:", error);
    }
  };

  const handleUpdateRawMaterial = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/rawMaterials/${selectedRawMaterialId}`,
        newRawMaterial
      );

      const response = await axios.get(
        "https://localhost:7028/api/rawMaterials"
      );

      setRawMaterials(response.data);
      setNewRawMaterial({
        Name: "",
        Stock: {
          QuantityAvailable: "",
          InitialStock: 0,
          ReorderPoint: 0,
          MinimumInventory: 0,
          MaximumInventory: 0,
        },
      });

      setShowUpdateModal(false); // Cerrar modal después de actualizar
    } catch (error) {
      console.error("Error updating rawMaterial:", error);
    }
  };

  const handleStockClick = (rawMaterialId) => {
    navigation.navigate("stocks", { rawMaterialId });
  };

  const handleMovementsClick = (rawMaterialId) => {
    navigation.navigate("Stocks", { rawMaterialId });
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
  };

  const handleShowUpdateModal = (rawMaterialId) => {
    const selectedRawMaterial = rawMaterials.find(
      (rawMaterial) => rawMaterial.rawMaterialId === rawMaterialId
    );

    setNewRawMaterial(selectedRawMaterial);
    setSelectedRawMaterialId(rawMaterialId);
    setShowUpdateModal(true);
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Ver SubCategoría de: </Text>
        <Text style={styles.cardText}>{item.name}</Text>
        <Divider />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleShowUpdateModal(item.rawMaterialId)}
            style={[styles.iconButton, { marginRight: 10 }]}
          >
            <Image source={boligrafo} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedRawMaterialId(item.rawMaterialId);
              setShowDeleteModal(true);
            }}
            style={styles.iconButton}
          >
            <Image source={basura} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardTotal}>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
          </View>
          <Text style={styles.title}>Lista de Materias Primas</Text>
          <FlatList
            data={rawMaterials}
            renderItem={renderItem}
            keyExtractor={(item) => item.rawMaterialId.toString()}
          />
          <TextInput
            style={styles.input}
            value={newRawMaterial.Name}
            onChangeText={(text) =>
              setNewRawMaterial({ ...newRawMaterial, Name: text })
            }
            placeholder="Nombre de nueva Materia Prima"
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad disponible de existencias del Autoparte"
            value={
              newRawMaterial.Stock &&
              newRawMaterial.Stock.QuantityAvailable !== undefined
                ? newRawMaterial.Stock.QuantityAvailable.toString()
                : "Ingrese la cantidad disponible de existencias del Autoparte"
            }
            onChangeText={(text) =>
              setNewRawMaterial({
                ...newRawMaterial,
                Stock: {
                  ...newRawMaterial.Stock,
                  QuantityAvailable: parseInt(text),
                },
              })
            }
            placeholderTextColor="#000"
          />
          <Button
            mode="contained"
            onPress={handleCreateRawMaterial}
            style={styles.button}
          >
            Crear Materia Prima
          </Button>
        </View>
      </ScrollView>

      <Portal>
        <Modal
          visible={showUpdateModal}
          onRequestClose={handleCloseModal}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Actualizar Materia Prima</Text>
            <TextInput
              style={styles.modalInput}
              value={newRawMaterial.Name}
              onChangeText={(text) =>
                setNewRawMaterial({ ...newRawMaterial, Name: text })
              }
              placeholder="Nuevo nombre de Materia Prima"
              placeholderTextColor="#000"
            />
            <Button
              mode="contained"
              onPress={() => {
                handleUpdateRawMaterial();
                handleCloseModal();
              }}
              style={styles.button}
            >
              Actualizar
            </Button>
          </View>
        </Modal>
      </Portal>

      <Portal>
        <Dialog visible={showDeleteModal} onDismiss={handleCloseModal}>
          <Dialog.Title>Eliminar Materia Prima</Dialog.Title>
          <Dialog.Content>
            <Paragraph>¿Estás seguro de eliminar esta Materia Prima?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCloseModal}>Cancelar</Button>
            <Button
              onPress={() => {
                handleDeleteRawMaterial(selectedRawMaterialId);
                handleCloseModal();
              }}
            >
              Eliminar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  cardTotal: {
    borderRadius: 20,
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  titleLogo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000",
  },
  card: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 2,
    elevation: 5,
    alignSelf: "center",
    marginTop: 50,
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  cardText: {
    marginBottom: 10,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "80%",
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#007bff",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconButton: {
    marginRight: 10,
  },
});

export default RawMaterials;
