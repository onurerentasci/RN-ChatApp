import React from "react";
import { Text, View } from "react-native";
import { Avatar, Button, Subheading, Title } from "react-native-paper";

const Settings = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 16 }}>
      <Avatar.Text label="UN" />
      <Title>username</Title>
      <Subheading>username@name.com</Subheading>
      <Button>Sign Out</Button>
    </View>
  );
};

export default Settings;
