import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import salir from "./assets/imgs/salir.jpg";

{
  /* Componetes princiaples para el inicio de la app*/
}
import Registro from "./Componentes/Registro";
import Login from "./Componentes/Login";

{
  /* Menus Principales*/
}
import Menu from "./Componentes/Menu";
import Productos from "./Componentes/Productos";

{
  /* Componentes para Categorias y Sucategorias */
}
import EscogerCategoriasSubactegorias from "./Componentes/EscogerCategoriasSubactegorias";
import AllCategories from "./Componentes/AllCategories";
import Subcategorias from "./Componentes/Subcategorias";
import MenuSubcategories from "./Componentes/Menus/MenuSubcategories";

{
  /* Compomenentes para Autopartes */
}
import MenuAutoparts from "./Componentes/Menus/MenuAutoparts";
import Autoparts from "./Componentes/Autoparts";
import EscogerAutoparte from "./Componentes/EscogerAutoparte";
import AllAutoparts from "./Componentes/AllAutoparts";

{
  /* Componentes para Materia Primas */
}
import rawMaterials from "./Componentes/rawMaterials";
import stocks from "./Componentes/stocks";

{
  /* Componentes para proveedores */
}
import Escoger_Proveedor from "./Componentes/Escoger_Proveedor";
import AllProveedores from "./Componentes/AllProveedores";
import ProveedoresNatural from "./Componentes/ProveedoresNatural";
import AddressProviders from "./Componentes/AddressProviders";
import PhonesProviders from "./Componentes/PhonesProviders";

{
  /* Componentes para Customers */
}
import AllCustomer from "./Componentes/AllCustomer";
import Customers from "./Componentes/Customers";
import Escoger_Customer from "./Componentes/Escoger_Customer";
import PhonesCustomer from "./Componentes/PhonesCustomer";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

  const handleLogin = () => {
    // Simulacion de autenticacion exitosa
    setIsAuthenticated(true);
    navigation.navigate("Menu");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigation.navigate("Login");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, title: "Login" }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              handleLogin();
            },
          })}
        />
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar, // Aplica el estilo de la barra inferior
            },
            title: "Inicio",
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Productos"
          component={Productos}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Escoger_Proveedor"
          component={Escoger_Proveedor}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="EscogerAutoparte"
          component={EscogerAutoparte}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="AllAutoparts"
          component={AllAutoparts}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="EscogerCategoriasSubactegorias"
          title="Todas las Categorias"
          component={EscogerCategoriasSubactegorias}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="AllCategories"
          title="Todas las Categorias"
          component={AllCategories}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Subcategorias"
          component={Subcategorias}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="MenuSubcategories"
          component={MenuSubcategories}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="MenuAutoparts"
          component={MenuAutoparts}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="Autoparts"
          component={Autoparts}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="rawMaterials"
          component={rawMaterials}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="stocks"
          component={stocks}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="AllProveedores"
          component={AllProveedores}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="ProveedoresNatural"
          component={ProveedoresNatural}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
        <Stack.Screen
          name="AddressProviders"
          component={AddressProviders}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />

        <Stack.Screen
          name="PhonesProviders"
          component={PhonesProviders}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />

        <Stack.Screen
          name="AllCustomer"
          component={AllCustomer}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />

        <Stack.Screen
          name="Customers"
          component={Customers}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />

        <Stack.Screen
          name="Escoger_Customer"
          component={Escoger_Customer}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />

        <Stack.Screen
          name="PhonesCustomer"
          component={PhonesCustomer}
          options={{
            tabBarOptions: {
              position: "bottom",
              style: styles.tabBar,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
                <Text> Inicio </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity onPress={() => handleLogout()}>
                <Image source={salir} style={styles.logo}></Image>
              </TouchableOpacity>
            ),
          }}
          listeners={({ navigation }) => ({
            beforeRemove: () => !isAuthenticated,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    position: "bottom",
    height: 50,
    border: {
      width: 1,
      color: "#ccc",
    },
    backgroundColor: "#000",
    color: "#fff",
  },
  logo: {
    width: 37,
    height: 57,
    resizeMode: "contain",
    marginLeft: 50,
  },
});

export default App;
