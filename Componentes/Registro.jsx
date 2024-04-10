import React, { useState } from "react";
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Picker,
} from "react-native";
import { Text } from "react-native-paper";
import axios from "axios";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userType, setUserType] = useState("Usuario");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [camposIncompletos, setCamposIncompletos] = useState(false);

  const handleRegister = async () => {
    try {
      if (
        !firstName ||
        !lastName ||
        !userName ||
        !password ||
        !email ||
        !phoneNumber
      ) {
        setCamposIncompletos(true);
        setTimeout(() => {
          setCamposIncompletos(false);
        }, 1000);
        throw new Error("Por favor, completa todos los campos");
      }

      const apiUrl = "https://localhost:7028/api/authentication";
      const response = await axios.post(apiUrl, {
        FirstName: firstName,
        LastName: lastName,
        UserName: userName,
        Password: password,
        Email: email,
        PhoneNumber: phoneNumber,
        Roles: [userType === "Administrador" ? "Administrator" : "User"],
      });

      console.log("Respuesta de la API:", response.data);

      if ((response.status === 200, 201, 203, 204)) {
        Alert.alert("Éxito", "Usuario creado exitosamente", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigation.navigate("Login");
        }, 1000);
      } else {
        throw new Error(
          response.data.error || "Error en la creación de usuario"
        );
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setShowErrorMessage(true);
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 1000);
      let errorMessage =
        "Error al registrar usuario. Por favor, intenta nuevamente.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showSuccessMessage && (
        <View style={styles.successMessageContainer}>
          <Text style={styles.successMessageText}>
            Registro de Usuario exitoso
          </Text>
        </View>
      )}
      {showErrorMessage && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessageText}>
            Registro de Usuario fallido, Intente nuevamente
          </Text>
        </View>
      )}
      {camposIncompletos && (
        <View style={styles.camposIncompletos}>
          <Text style={styles.camposIncompletosText}>
            Por favor, completa todos los campos
          </Text>
        </View>
      )}
      <View style={styles.header} role="banner">
        <Image
          source={require("../assets/imgs/jucar.jpg")}
          style={[styles.logo, { tintColor: "#ffffff" }]}
          resizeMode="contain"
        />
        <Text style={styles.titleLogo}>AUTOPARTES JUCAR SAS</Text>
      </View>
      <View style={styles.card} role="form">
        <View style={styles.form}>
          <Text style={styles.title}>Registro de Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={firstName}
            onChangeText={setFirstName}
            key="firstName"
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
            key="lastName"
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={userName}
            onChangeText={setUserName}
            key="userName"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            key="password"
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            key="email"
          />

          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            key="phoneNumber"
          />

          <Picker
            selectedValue={userType}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
            key="userType"
          >
            <Picker.Item label="Usuario" value="Usuario" />
            <Picker.Item label="Administrador" value="Administrador" />
          </Picker>

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttontxt}>Guardar Usuario</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  card: {
    borderRadius: 30,
    width: "80%",
    backgroundColor: "#fff",
    padding: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    alignSelf: "center",
    marginTop: 50,
  },
  form: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  titleLogo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  errorMessageText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  camposIncompletos: {
    backgroundColor: "#F1C40F ",
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  camposIncompletosText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Register;
