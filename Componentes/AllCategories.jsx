import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Portal,
  Provider,
  Dialog,
  Paragraph,
  Text,
  Button,
  Divider,
  Card,
} from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import agregar from "../assets/imgs/boton-agregar.png";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateCategory = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7028/api/categories",
        {
          name: newCategoryName,
        }
      );

      setCategories([response.data, ...categories]);
      setNewCategoryName("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:7028/api/categories/${categoryId}`);

      const updatedCategories = categories.filter(
        (category) => category.categoryId !== categoryId
      );
      setCategories(updatedCategories);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/categories/${selectedCategoryId}`,
        {
          name: newCategoryName,
        }
      );

      const updatedCategories = categories.map((category) =>
        category.categoryId === selectedCategoryId
          ? { ...category, name: newCategoryName }
          : category
      );
      setCategories(updatedCategories);
      setShowUpdateModal(false);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Nombre: {item.name}</Text>
      </Card.Content>
      <Divider />
    </Card>
  );

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.cardTotal}>
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
          </View>
          <Text style={styles.title}>Lista de Categorías</Text>
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.categoryId.toString()}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              placeholder="Nombre de nueva categoría"
              placeholderTextColor="#000"
            />
            <TouchableOpacity
              onPress={handleCreateCategory}
              style={styles.addButton}
            >
              <Image source={agregar} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal para actualizar categoría */}
        <Portal>
          <Modal
            visible={showUpdateModal}
            onRequestClose={() => setShowUpdateModal(false)}
            animationType="slide"
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Actualizar Categoría</Text>
              <TextInput
                style={styles.modalInput}
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                placeholder="Nuevo nombre de categoría"
                placeholderTextColor="#000"
              />
              <Button
                mode="contained"
                onPress={handleUpdateCategory}
                style={styles.button}
                labelStyle={styles.buttonText}
              >
                Actualizar
              </Button>
            </View>
          </Modal>
        </Portal>

        {/* Modal para eliminar categoría */}
        <Portal>
          <Dialog
            visible={showDeleteModal}
            onDismiss={() => setShowDeleteModal(false)}
          >
            <Dialog.Title>Eliminar Categoría</Dialog.Title>
            <Dialog.Content>
              <Paragraph>¿Estás seguro de eliminar esta categoría?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => setShowDeleteModal(false)}
                style={styles.textDialog}
                labelStyle={styles.buttonText}
              >
                Cancelar
              </Button>
              <Button
                onPress={() => handleDeleteCategory(selectedCategoryId)}
                labelStyle={styles.buttonText}
              >
                Eliminar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  cardTotal: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", // Reemplazo de las propiedades de sombra
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
    width: 107,
    height: 57,
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
    marginVertical: 5,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: 10,
    color: "#000",
    borderRadius: 10,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  button: {
    marginTop: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textDialog: {
    color: "#000",
  },
});

export default AllCategories;
