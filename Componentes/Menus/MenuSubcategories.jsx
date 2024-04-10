import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, Button, Card, Divider } from "react-native-paper";
import Logo from "../../assets/imgs/jucar.jpg";
import basura from "../../assets/imgs/basura.png";
import ver from "../../assets/imgs/ver.png";
import boligrafo from "../../assets/imgs/boligrafo.png";

const MenuSubcategories = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

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

  const handleCategoryClick = (categoryId) => {
    navigation.navigate("Subcategorias", { categoryId });
  };

  const handleUpdate = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setShowModal(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`https://localhost:7028/api/categories/${categoryId}`);
      setCategories(categories.filter((cat) => cat.categoryId !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/categories/${selectedCategory.categoryId}`,
        {
          name: categoryName, // Enviar el nuevo nombre de la categoría al servidor
        }
      );
      setShowModal(false);
      // Actualizar la lista de categorías después de la modificación
      const updatedCategories = categories.map((cat) =>
        cat.categoryId === selectedCategory.categoryId
          ? { ...cat, name: categoryName }
          : cat
      );
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Categorías</Text>
        {categories.map((category) => (
          <Card key={category.categoryId} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Ver Subcategorías de:</Text>
              <Text style={styles.cardText}>{category.name}</Text>
            </Card.Content>
            <Divider />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleCategoryClick(category.categoryId)}
              >
                <Image source={ver} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdate(category)}
              >
                <Image source={boligrafo} style={styles.icon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDelete(category.categoryId)}
              >
                <Image source={basura} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        {/* Modal para actualizar categoría */}
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Actualizar Categoría</Text>
            <TextInput
              style={styles.input}
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <Button onPress={handleSaveChanges}>Guardar Cambios</Button>
            <Button onPress={() => setShowModal(false)}>Cerrar</Button>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  cardActions: {
    justifyContent: "space-around",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardTotal: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", // Reemplazo de shadow* por boxShadow
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default MenuSubcategories;
