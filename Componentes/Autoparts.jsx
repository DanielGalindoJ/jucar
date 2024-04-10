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
  Picker,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import basura from "../assets/imgs/basura.png";
import boligrafo from "../assets/imgs/boligrafo.png";
import agregar from "../assets/imgs/boton-agregar.png";
import x from "../assets/imgs/error.png";
import { Divider } from "react-native-paper";

const Autoparts = ({ route }) => {
  const { subcategoryId } = route.params;
  const [autoparts, setAutoparts] = useState([]);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [newAutopart, setNewAutopart] = useState({
    Name: "",
    Description: "",
    Inventory: "",
    Value: "",
    RawMaterialId: "",
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAutopartId, setSelectedAutopartId] = useState("");

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`
        );
        setAutoparts(response.data);
      } catch (error) {
        console.error("Error fetching autoparts:", error);
      }
    };

    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/rawMaterials`
        );
        setRawMaterials(response.data);
      } catch (error) {
        console.error("Error fetching raw materials:", error);
      }
    };

    fetchAutoparts();
    fetchRawMaterials();
  }, [subcategoryId]);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleCreateAutopart = async () => {
    try {
      // Validación de campos obligatorios y tipos de datos
      if (
        !newAutopart.Name ||
        !newAutopart.Description ||
        !newAutopart.Inventory ||
        !newAutopart.Value ||
        !newAutopart.RawMaterialId ||
        typeof newAutopart.Inventory !== "number" ||
        typeof newAutopart.Value !== "number"
      ) {
        console.error("Por favor complete todos los campos correctamente.");
        return;
      }

      const response = await axios.post(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`,
        newAutopart
      );

      setAutoparts([response.data, ...autoparts]);

      setNewAutopart({
        Name: "",
        Description: "",
        Inventory: "",
        Value: "",
        RawMaterialId: "",
      });

      handleCloseModal(); // Cierra el modal después de crear una autoparte exitosamente
    } catch (error) {
      console.error("Error creating autopart:", error);
    }
  };

  const handleUpdateAutopart = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts/${selectedAutopartId}`,
        newAutopart
      );

      const response = await axios.get(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`
      );

      const updatedAutoparts = response.data;

      setAutoparts(updatedAutoparts);

      handleCloseModal(); // Cierra el modal después de actualizar una autoparte exitosamente
    } catch (error) {
      console.error("Error updating autopart:", error);
    }
  };

  const handleDeleteAutopart = async (autopartId) => {
    try {
      await axios.delete(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts/${autopartId}`
      );

      const updatedAutoparts = autoparts.filter(
        (autopart) => autopart.autopartID !== autopartId
      );
      setAutoparts(updatedAutoparts);

      handleCloseModal(); // Cierra el modal después de eliminar una autoparte exitosamente
    } catch (error) {
      console.error("Error deleting autopart:", error);
    }
  };

  const handleShowCreateModal = () => {
    setNewAutopart({
      Name: "",
      Description: "",
      Inventory: "",
      Value: "",
      RawMaterialId: "",
    });
    setShowCreateModal(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>Nombre: {item.name}</Text>
      <Text>Descripción: {item.description}</Text>
      <Text>Inventario: {item.inventory}</Text>
      <Text>Valor: {item.value}</Text>
      <View style={styles.iconContainer}>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            setSelectedAutopartId(item.autopartID);
            setNewAutopart({
              Name: item.name,
              Description: item.description,
              Inventory: item.inventory,
              Value: item.value,
              RawMaterialId: item.rawMaterialId,
            });
            setShowEditModal(true);
          }}
          style={[styles.iconButton, { marginRight: 10 }]}
        >
          <Image source={boligrafo} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowDeleteModal(true)}
          style={styles.iconButton}
        >
          <Image source={basura} style={styles.icon} />
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
        <Text style={styles.title}>Autoparte</Text>
        <FlatList
          data={autoparts}
          renderItem={renderItem}
          keyExtractor={(item) => item.autopartID.toString()}
        />
      </View>

      <TouchableOpacity
        onPress={handleShowCreateModal}
        style={styles.addButton}
      >
        <Image source={agregar} style={styles.icon} />
      </TouchableOpacity>

      {/* Modal para crear autopartes */}
      <Modal visible={showCreateModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Crear Autoparte</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Autoparte"
            value={newAutopart.Name}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción del Autoparte (solo letras)"
            value={newAutopart.Description}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese la cantidad de Autoparte en el inventario"
            keyboardType="numeric"
            value={newAutopart.Inventory.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Inventory: parseInt(text) })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese el valor del Autoparte"
            keyboardType="numeric"
            value={newAutopart.Value.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Value: parseInt(text) })
            }
          />
          <Picker
            selectedValue={newAutopart.RawMaterialId}
            style={styles.input}
            onValueChange={(itemValue) =>
              setNewAutopart({ ...newAutopart, RawMaterialId: itemValue })
            }
          >
            <Picker.Item label="Seleccionar Materia Prima" value="" />
            {rawMaterials.map((material) => (
              <Picker.Item
                key={material.rawMaterialId}
                label={material.name}
                value={material.rawMaterialId}
              />
            ))}
          </Picker>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              onPress={handleCreateAutopart}
              style={styles.modalButton}
            >
              <Image source={agregar} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.modalButton}
            >
              <Image source={x} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para actualizar autopartes */}
      <Modal visible={showEditModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Actualizar Autoparte</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={newAutopart.Name}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={newAutopart.Description}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Description: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese el valor"
            keyboardType="numeric"
            value={newAutopart.Value.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Value: parseInt(text) })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Ingrese la cantidad del inventario"
            keyboardType="numeric"
            value={newAutopart.Inventory.toString()}
            onChangeText={(text) =>
              setNewAutopart({ ...newAutopart, Inventory: parseInt(text) })
            }
          />
          <Picker
            selectedValue={newAutopart.RawMaterialId}
            style={styles.input}
            onValueChange={(itemValue) =>
              setNewAutopart({ ...newAutopart, RawMaterialId: itemValue })
            }
          >
            <Picker.Item label="Seleccionar Materia Prima" value="" />
            {rawMaterials.map((material) => (
              <Picker.Item
                key={material.rawMaterialId}
                label={material.name}
                value={material.rawMaterialId}
              />
            ))}
          </Picker>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              onPress={handleUpdateAutopart}
              style={styles.modalButton}
            >
              <Image source={boligrafo} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.modalButton}
            >
              <Image source={x} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para eliminar autopartes */}
      <Modal visible={showDeleteModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Eliminar Autoparte</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              onPress={() => handleDeleteAutopart(selectedAutopartId)}
              style={styles.modalButton}
            >
              <Image source={basura} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.modalButton}
            >
              <Image source={x} style={styles.icon} />
            </TouchableOpacity>
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
  iconButton: {
    marginRight: 10,
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
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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

export default Autoparts;
