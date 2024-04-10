import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { Text, Button, Card } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { ScrollView } from "react-native-gesture-handler";

const Stocks = ({ route }) => {
  const { rawMaterialId } = route.params;
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    QuantityAvailable: 0,
    InitialStock: 0,
    ReorderPoint: 0,
    MinimumInventory: 0,
    MaximumInventory: 0,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/rawMaterials/${rawMaterialId}/stocks`
        );
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchStock();
  }, [rawMaterialId]);

  const handleUpdateStock = async () => {
    try {
      await axios.put(
        `https://localhost:7028/api/rawMaterials/${rawMaterialId}/stocks/${selectedStockId}`,
        newStock
      );

      const response = await axios.get(
        `https://localhost:7028/api/rawMaterials/${rawMaterialId}/stocks`
      );

      const updatedStock = response.data;

      setStocks(updatedStock);

      setNewStock({
        QuantityAvailable: 0,
        InitialStock: 0,
        ReorderPoint: 0,
        MinimumInventory: 0,
        MaximumInventory: 0,
      });

      setShowModal(false);
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ScrollView>
        {" "}
        <View style={styles.cardTotal}>
          <Image source={Logo} style={styles.logo} />

          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>

          <Text style={styles.title}>Modulo de Subcategorias</Text>
          <FlatList
            data={stocks}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <View style={styles.item} key={item.StockId}>
                  <Card.Content>
                    <Text style={styles.cardText}>{item.name}</Text>
                  </Card.Content>
                  <Card.Actions style={styles.cardActions}>
                    <Button
                      style={styles.botones}
                      mode="contained"
                      onPress={() =>
                        handleDeleteSubcategory(item.subcategoryId)
                      }
                    >
                      Eliminar
                    </Button>
                  </Card.Actions>
                </View>
              </Card>
            )}
          />
          <TextInput
            style={styles.input}
            value={newStock}
            onChangeText={setNewStock}
            placeholder="Nombre de nueva categoría"
          />
          <Button mode="contained" onPress={handleUpdateStock}>
            Actualizar
          </Button>
        </View>
      </ScrollView>

      {/* Modal para actualizar stock */}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Actualizar Stock</Text>
          {/* Aquí deberías poner los campos para actualizar el stock */}
          <Button
            mode="contained"
            onPress={handleUpdateStock}
            style={styles.button}
          >
            Actualizar
          </Button>
          <Button
            mode="contained"
            onPress={handleCloseModal}
            style={styles.button}
          >
            Cancelar
          </Button>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: "black",
  },
  logo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginRight: 10,
  },
  navbar: {
    backgroundColor: "#f80759",
    color: "#fff",
    borderColor: "#03a9f4",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: 30,
    fontWeight: 500,
    marginTop: 1,
  },
  titleLogo: {
    width: 107,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
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
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  cardText: {
    marginBottom: 10,
  },
  cardActions: {
    justifyContent: "space-around",
  },
  botones: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f80759",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginVertical: 5,
  },
});

export default Stocks;
