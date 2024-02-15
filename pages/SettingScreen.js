import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import axios from "axios";

const SettingsScreen = ({ navigation }) => {
  const [host, setHost] = useState(0);
  const [username, setUsername] = useState("");
  const [port, setPort] = useState(0);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleConnect = async () => {
    setStatus("Connecting..."); // Set loading message
    try {
      const response = await axios.post("http://192.168.178.46:3000/connect", {
        host,
        username,
        password,
        port,
        database: "test",
      });

      const data = response.data;
      console.log(data);
      setStatus(data.message);
    } catch (error) {
      console.error("Error connecting to the database:", error.message);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Host"
        value={host}
        onChangeText={(text) => setHost(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Port"
        value={port}
        onChangeText={(text) => setPort(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Connect" onPress={handleConnect} />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  status: {
    marginTop: 10,
    color: "green",
    fontSize: 16,
  },
});
export default SettingsScreen;
