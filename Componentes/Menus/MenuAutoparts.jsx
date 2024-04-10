import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { Text, Card } from "react-native-paper";
import Logo from "../../assets/imgs/jucar.jpg";
import basura from "../../assets/imgs/basura.png";
import ver from "../../assets/imgs/ver.png";
import boligrafo from "../../assets/imgs/boligrafo.png";

const MenuAutoparts = ({ navigation }) => {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7028/api/subcategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubcategoryClick = (subcategoryId) => {
    navigation.navigate("Autoparts", { subcategoryId });
  };

  return (
    <ScrollView>
      <View style={styles.cardTotal}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <Text style={styles.title}>Subcategories</Text>
        {subcategories.map((subcategory) => (
          <Card key={subcategory.subcategoryId} style={styles.card}>
            <Card.Content>
              <Text style={styles.cardTitle}>Ver detalle de:</Text>
              <Text style={styles.cardText}>{subcategory.name}</Text>
            </Card.Content>
            <Card.Actions style={styles.cardActions}>
              <TouchableOpacity
                onPress={() =>
                  handleSubcategoryClick(subcategory.subcategoryId)
                }
              >
                <Image source={ver} style={styles.icon} />
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardTotal: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
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
  icon: {
    width: 24,
    height: 24,
  },
});

export default MenuAutoparts;
