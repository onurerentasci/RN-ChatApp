import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Avatar, Button, Subheading, Title } from "react-native-paper";
import firebase from "firebase/compat/app";
import { useNavigation } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setName(user?.displayName ?? "");
      setEmail(user?.email ?? "");
    });
  }, []);
  return (
    <View style={{ alignItems: "center", marginTop: 16 }}>
      <Avatar.Text
        label={name.split(" ").reduce((prev, current) => prev + current[0], "")}
      />
      <Title>{name}</Title>
      <Subheading>{email}</Subheading>
      <Button onPress={() => firebase.auth().signOut()}>Sign Out</Button>
      <Button onPress={() => navigation.navigate("SignIn")}>Sign In</Button>
    </View>
  );
};

export default Settings;
