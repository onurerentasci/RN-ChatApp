import React, { useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { Provider, DefaultTheme } from "react-native-paper";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebaseConfig";

import ChatList from "./screens/ChatList";
import Chat from "./screens/Chat";
import SignUp from "./screens/SignUp";
import Signin from "./screens/Signin";
import Settings from "./screens/Settings";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

firebase.initializeApp(firebaseConfig);
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate("SignUp");
      }
    });
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarOption: {
          showLabel: false,
        },
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={route.name === "ChatList" ? "chatbubbles" : "settings"}
              color="#6750a4"
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerTitle: "Chats", tabBarActiveTintColor: "#6750a4" }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: "Settings", tabBarActiveTintColor: "#6750a4" }}
      />
    </Tabs.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              presentation: "fullScreenModal",
              headerTitle: "Sign Up",
            }}
          />
          <Stack.Screen
            name="SignIn"
            component={Signin}
            options={{
              presentation: "fullScreenModal",
              headerTitle: "Sign In",
            }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};
export default App;
