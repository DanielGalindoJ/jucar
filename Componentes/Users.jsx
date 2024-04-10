import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { DataTable } from "react-native-paper";
import axios from "axios";
import Logo from "../assets/imgs/jucar.jpg";

const Users = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/autoparts"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        setError("Error al cargar datos. Inténtalo de nuevo más tarde.");
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : (
          <DataTable style={styles.dataTable}>
            <DataTable.Header></DataTable.Header>

            {items.map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleItemPress(item)}
              >
                <DataTable.Row>
                  <DataTable.Cell>{item.FirstName}</DataTable.Cell>
                  <DataTable.Cell>{item.LastName}</DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          </DataTable>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            {selectedItem && (
              <>
                <Text>FirstName: {selectedItem.FirstName}</Text>
                <Text>LastName: {selectedItem.Descripcion}</Text>
                <Text>UserName: {selectedItem.Descripcion}</Text>
                <Text>Email: {selectedItem.Descripcion}</Text>
                <Text>PhoneNumber: {selectedItem.Descripcion}</Text>
                <Text>LastName: {selectedItem.Descripcion}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ color: "blue", marginTop: 10 }}>Close</Text>
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
    backgroundColor: "#F5F5DC",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "5%",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  dataTable: {
    marginTop: 16,
  },
});

export default Users;
