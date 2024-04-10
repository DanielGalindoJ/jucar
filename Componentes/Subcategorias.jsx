import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { ScrollView } from "react-native-gesture-handler";
import agregar from "../assets/imgs/boton-agregar.png";
import basura from "../assets/imgs/basura.png";

const Subcategories = ({ route }) => {
  const { categoryId } = route.params;
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/categories/${categoryId}/subcategories`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleCreateSubcategory = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/categories/${categoryId}/subcategories`,
        {
          name: newSubcategoryName,
        }
      );

      setSubcategories([response.data, ...subcategories]);
      setNewSubcategoryName("");
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/categories/${categoryId}/subcategories/${subcategoryId}`
      );

      const updatedSubcategories = subcategories.filter(
        (subcategory) => subcategory.subcategoryId !== subcategoryId
      );
      setSubcategories(updatedSubcategories);
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.item}>
          <Text style={styles.cardTitle}>Nombre: {item.name}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleDeleteSubcategory(item.subcategoryId)}
          >
            <Image source={basura} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Módulo de Subcategorías</Text>
        <FlatList
          data={subcategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.subcategoryId.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newSubcategoryName}
            onChangeText={setNewSubcategoryName}
            placeholder="Nombre de nueva subcategoría"
          />
          <TouchableOpacity
            onPress={handleCreateSubcategory}
            style={[styles.button, styles.addButton]}
          >
            <Image source={agregar} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
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
    width: "100%",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  addButton: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
});

export default Subcategories;
