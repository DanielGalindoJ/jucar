import React from "react";
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  Dimensions,
} from "react-native";

import { Text } from "react-native-paper";
import Logo from "../assets/imgs/jucar.jpg";
import iconoProductos from "../assets/imgs/Tuerca.png";
import iconoProveedores from "../assets/imgs/Proveedor.png";
import iconoNegocio from "../assets/imgs/Portafolio77.png";
import iconoUsuarios from "../assets/imgs/Usuario.png";

const Menu = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="red" />
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <Text style={styles.menuTitle}>Menu</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Productos")}
          >
            <Image source={iconoProductos} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Productos</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Escoger_Proveedor")}
          >
            <Image source={iconoProveedores} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Proveedores</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Escoger_Customer")}
          >
            <Image source={iconoNegocio} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Ventas</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5DC",
    paddingVertical: 20,
    paddingHorizontal: 10,
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
  menuTitle: {
    fontFamily: "Aclonica",
    fontSize: 30,
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    width: buttonWidth,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },
  buttonIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "#fff",
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 30,
    width: buttonWidth,
    backgroundColor: "#fff",
    padding: 25,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    alignSelf: "center",
    marginTop: 50,
  },
});

export default Menu;
