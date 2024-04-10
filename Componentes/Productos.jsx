import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  Dimensions,
} from "react-native";
import { Text } from "react-native-paper";
import { View } from "react-native";
import Logo from "../assets/imgs/jucar.jpg";
import iconoCategoria from "../assets/imgs/Categorias2.png";
import iconoAutoparte from "../assets/imgs/Autopartes.png";
import iconoMateriaPrima from "../assets/imgs/MateriaP.png";

const Productos = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar backgroundColor="#f80759" />
      <View style={styles.card}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.subTitle}>Productos</Text>
          <Pressable
            style={styles.botones}
            onPress={() =>
              navigation.navigate("EscogerCategoriasSubactegorias")
            }
          >
            <Image source={iconoCategoria} style={styles.iconoBoton} />
            <Text style={styles.botonesText}>CATEGORIAS</Text>
          </Pressable>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("EscogerAutoparte")}
          >
            <Image source={iconoAutoparte} style={styles.iconoBoton} />
            <Text style={styles.botonesText}>AUTOPARTES</Text>
          </Pressable>

          <Pressable
            style={styles.botones}
            onPress={() => navigation.navigate("rawMaterials")}
          >
            <Image source={iconoMateriaPrima} style={styles.iconoBoton} />
            <Text style={styles.botonesText}>MATERIAS PRIMAS</Text>
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
    alignItems: "center",
    justifyContent: "center",
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subTitle: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    textAlign: "center",
  },
  botones: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f80759",
    borderColor: "#000",
    borderWidth: 3,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "80%",
    maxWidth: 300,
  },
  iconoBoton: {
    width: 40,
    height: 30,
    marginRight: 20,
  },
  botonesText: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "sans-serif",
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
});

export default Productos;
