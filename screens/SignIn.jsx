import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Subheading, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import firebase from "firebase/compat/app";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigation = useNavigation();

  const signIn = async () => {
    setIsLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.popToTop();
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <View style={{ margin: 16 }}>
      {!!error && (
        <Subheading
          style={{ color: "#6750a4", textAlign: "center", marginBottom: 16 }}
        >
          {error}
        </Subheading>
      )}

      <TextInput
        label="Email"
        keyboardType="email-address"
        style={{ marginTop: 12 }}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        label="Password"
        secureTextEntry
        style={{ marginTop: 12 }}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button compact={true} onPress={() => navigation.navigate("SignUp")}>
          Sign Up
        </Button>
        <Button mode="contained" onPress={() => signIn()} loading={isLoading}>
          Sign In
        </Button>
      </View>
      <Text
        style={{
          textAlign: "center",
          alignItems: "center",
          borderRadius: 16,
          margin: 24,
          padding: 8,
          fontSize: 16,
        }}
      ></Text>
    </View>
  );
};

export default Signin;
