import React, { useState, useEffect } from "react";
import { View, Modal, FlatList, StyleSheet, Image } from "react-native";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";
import { Divider, Card, Text, Button } from "react-native-paper";

const AllAutoparts = ({ subcategoryId }) => {
  const [autoparts, setAutoparts] = useState([]);
  const [newAutopart, setNewAutopart] = useState({
    Name: "",
    Description: "",
    Inventory: 0,
    Value: 0,
    RawMaterialId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("create");
  const [selectedAutopartId, setSelectedAutopartId] = useState("");

  useEffect(() => {
    const fetchAutoparts = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7028/api/autoparts`
        );
        setAutoparts(response.data);
      } catch (error) {
        console.error("Error fetching autoparts:", error);
      }
    };

    fetchAutoparts();
  }, [subcategoryId]);

  const handleCreateAutopart = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7028/api/subcategories/${subcategoryId}/autoparts`,
        newAutopart
      );

      setAutoparts([response.data, ...autoparts]);

      setNewAutopart({
        Name: "",
        Description: "",
        Inventory: 0,
        Value: 0,
        RawMaterialId: "",
      });
      handleCloseModal();
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

      setNewAutopart({
        Name: "",
        Description: "",
        Inventory: 0,
        Value: 0,
        RawMaterialId: "",
      });

      handleCloseModal();
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
    } catch (error) {
      console.error("Error deleting autopart:", error);
    }
  };

  const handleShowCreateModal = () => {
    setModalAction("create");
    setShowModal(true);
  };

  const handleShowEditModal = (autopartId) => {
    setModalAction("edit");
    setSelectedAutopartId(autopartId);

    const selectedAutopart = autoparts.find(
      (autopart) => autopart.autopartID === autopartId
    );

    if (selectedAutopart) {
      setNewAutopart({
        Name: selectedAutopart.name || "",
        Description: selectedAutopart.description || "",
        Inventory: selectedAutopart.inventory || 0,
        Value: selectedAutopart.value || 0,
        RawMaterialId: selectedAutopart.rawMaterialId || "",
      });
    }

    setShowModal(true);
  };

  const handleShowDetailModal = (autopartId) => {
    setModalAction("detail");
    setSelectedAutopartId(autopartId);

    const selectedAutopart = autoparts.find(
      (autopart) => autopart.autopartID === autopartId
    );

    if (selectedAutopart) {
      setNewAutopart({
        Name: selectedAutopart.name || "",
        Description: selectedAutopart.description || "",
        Inventory: selectedAutopart.inventory || 0,
        Value: selectedAutopart.value || 0,
        RawMaterialId: selectedAutopart.rawMaterialId || "",
      });
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewAutopart({
      Name: "",
      Description: "",
      Inventory: 0,
      Value: 0,
      RawMaterialId: "",
    });
    setSelectedAutopartId("");
  };

  // const handleShowLosses = (autopartId) => {
  //   // Redirige a la ruta "/autopart-losses" con el parámetro "autopartId"
  //   history.push("/autopart-losses", { autopartId });
  // };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Nombre: </Text>
        <Text style={styles.cardText}>{item.name}</Text>
        <Text style={styles.cardTitle}>Descripción: </Text>
        <Text style={styles.cardText}>{item.description}</Text>

        <Text style={styles.cardTitle}>Inventario: </Text>
        <Text style={styles.cardText}>{item.inventory}</Text>

        <Text style={styles.cardTitle}>Valor: </Text>
        <Text style={styles.cardText}>{item.value}</Text>

        <Divider />
      </Card.Content>
    </Card>
  );

  return (
    <View>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Autopartes Actuales</Text>

        <FlatList
          data={autoparts}
          renderItem={renderItem}
          keyExtractor={(item) => item.autopartID.toString()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
  cardActions: {
    justifyContent: "space-around",
  },
});
export default AllAutoparts;
