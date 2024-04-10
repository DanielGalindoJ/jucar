import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        throw new Error("Por favor completa todos los campos");
      }

      const apiUrl = "https://localhost:7028/api/authentication/login";
      const response = await axios.post(apiUrl, {
        username: username,
        password: password,
      });

      console.log("Respuesta de la API:", response.data);

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        navigation.navigate("Menu");
      }, 1000);
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1000);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showSuccessMessage && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>
            Inicio de sesión exitoso
          </Text>
        </View>
      )}
      {showErrorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>
            Credenciales incorrectas. Por favor, intenta nuevamente.
          </Text>
        </View>
      )}
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={require("../assets/imgs/jucar.jpg")}
            style={styles.logo}
          />
          <Text style={styles.title}>AUTOPARTES JUCAR SAS</Text>
        </View>

        <View style={styles.form}>
          <Image
            source={{
              uri: "https://us.123rf.com/450wm/rigsby8131/rigsby81311704/rigsby8131170400147/75488593-tuercas-pernos-y-arandelas-en-un-fondo-de-acero.jpg?ver=6",
            }}
            style={{ ...styles.image, resizeMode: "contain" }} // Ajuste aquí
          />
          <Text style={styles.titleInicard}>Iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuario"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttontxt}>Ingresar</Text>
          </Pressable>
          <Pressable
            style={styles.link}
            onPress={() => navigation.navigate("Registro")}
          >
            <Text style={styles.linkText}>
              ¿No tienes una cuenta? Regístrate aquí
            </Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.containerFooter}>
            <Text style={styles.titleFooter}>
              Derechos reservados Jucar S.A.S
            </Text>
            <Text style={styles.titleFooter}>Calle 7 #90-76</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  logo: {
    width: "40%",
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    elevation: 5,
    alignSelf: "center",
  },
  image: {
    width: "80%",
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  form: {
    alignItems: "center",
  },
  titleInicard: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#9E9E9E",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#f80759",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttontxt: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    textTransform: "uppercase",
  },
  link: {
    marginBottom: 20,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  footer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 20,
  },
  containerFooter: {
    width: "80%",
    paddingVertical: 20,
  },
  titleFooter: {
    fontSize: 17,
    textAlign: "center",
    color: "white",
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },

  successMessageContainer: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    borderRadius: 10,
  },
  successMessageText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  errorMessageContainer: {
    backgroundColor: "#f44336",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 20,
    borderRadius: 10,
  },
  errorMessageText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Login;
