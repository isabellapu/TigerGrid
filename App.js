import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Create each screen and design it
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={() => navigation.navigate("Sign")} />
    </View>
  );
};

const SignInScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the Sign In Screen</Text>
    </View>
  );
};

// To create navigation and multiple screens
const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Sign"
          component={SignInScreen}
          options={{ title: "Sign-In" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Styling Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyStack;
