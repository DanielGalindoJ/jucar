import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
import Logo from "../assets/imgs/jucar.jpg";
import categoriaIcon from "../assets/imgs/Tuerca.png";
import crearCategoriaIcon from "../assets/imgs/Tuerca.png";

const { width } = Dimensions.get("window");

const EscogerCategoriasSubactegorias = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CATEGORIAS</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("AllCategories")}
          >
            <Image source={categoriaIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Lista de Categorias</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("MenuSubcategories")}
          >
            <Image source={crearCategoriaIcon} style={styles.icon} />
            <Text style={styles.buttonText}>Menu Subcategorías</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5DC",
    padding: 20,
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "black",
    marginBottom: 0,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    marginBottom: 10,
    width: width * 0.8,
    marginVertical: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  icon: {
    width: 24,
    height: 30,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 19,
    color: "#fff",
    textTransform: "uppercase",
    marginLeft: 10,
  },
  card: {
    borderRadius: 30,
    width: width * 0.8,
    backgroundColor: "#fff",
    padding: 25,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default EscogerCategoriasSubactegorias;
