import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import axios from "axios";
import { Divider, Card, Text } from "react-native-paper";
import Logo from "../assets/imgs/jucar.jpg";

const AllCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/customers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.cardTitle}>Tipo de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierType}</Text>

        <Text style={styles.cardTitle}>Numero de Identificacion: </Text>
        <Text style={styles.cardText}>{item.identifierNumber}</Text>

        <Text style={styles.cardTitle}>Nombre : </Text>
        <Text style={styles.cardText}>{item.name}</Text>

        <Text style={styles.cardTitle}>Correo electronico: </Text>
        <Text style={styles.cardText}>{item.email}</Text>

        <Text style={styles.cardTitle}>Dirrecion </Text>
        <Text style={styles.cardText}>{item.address}</Text>

        <Text style={styles.cardTitle}>Telefono </Text>
        <Text style={styles.cardText}>{item.phoneNumber}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Lista de Clientes Actuales</Text>

        <FlatList
          data={customers}
          renderItem={renderItem}
          keyExtractor={(item) => item.identifierNumber.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
    justifyContent: "center",
    alignItems: "center",
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
});

export default AllCustomers;
