import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import axios from "axios";
import { Alert } from "react-native";

export default function HomeScreen({ navigation }) {
  const [dataFields, setDataFields] = useState(["", "", ""]);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [scannedInputIndex, setScannedInputIndex] = useState(null);

  useEffect(() => {
    if (scannedInputIndex !== null) {
      const newFields = [...dataFields];
      newFields[scannedInputIndex] = scannedData;
      setDataFields(newFields);
      setIsScannerVisible(false);
      setScannedInputIndex(null);
      setScannedData("");
    }
  }, [scannedData]);

  const handleInputChange = (text, index) => {
    const newFields = [...dataFields];
    newFields[index] = text;
    setDataFields(newFields);
  };

  const handleScanButtonPress = (index) => {
    setIsScannerVisible(true);
    setScannedData("");
    setScannedInputIndex(index);
  };

  const handleBarcodeScan = ({ data }) => {
    if (scannedInputIndex !== null) {
      const newFields = [...dataFields];
      newFields[scannedInputIndex] = data;
      setDataFields(newFields);
      setScannedData(data);
      setIsScannerVisible(false);
      setScannedInputIndex(null);
    }
  };
  const handleSubmit = async () => {
    try {
      await axios.post("http://192.168.178.46:3000/submittedData", 
        dataFields,
      );
    } catch (error) {
      Alert.alert("Error saving data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {isScannerVisible && (
        <View style={styles.barcodebox}>
          <Camera
            style={{ flex: 1, width: "100%" }}
            type={Camera.Constants.Type.back}
            onBarCodeScanned={handleBarcodeScan}
          />
        </View>
      )}
      <Button
        title="Go to settings"
        onPress={() => navigation.navigate("Settings")}
        style={styles.button_to_settings}
      />
      <View style={styles.inputContainer}>
        {dataFields.length > 0 &&
          dataFields.map((value, index) => (
            <View key={index} style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={`Enter data ${index + 1}`}
                onChangeText={(text) => handleInputChange(text, index)}
                value={dataFields[index]}
              />
              <TouchableOpacity
                onPress={() => handleScanButtonPress(index)}
                style={styles.scanButton}
              >
                <Text style={styles.scanButtonText}>Scan</Text>
              </TouchableOpacity>
            </View>
          ))}
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0ebeb",
    height: "100%",
    gap: "50px",
  },
  button_to_settings: {
    marginBottom: "auto",
  },
  barcodebox: {
    flex: 1,
    width: "100%",

    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  inputContainer: {
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    padding: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 250,
    margin: 10,
    padding: 5,
  },
  scanButton: {
    backgroundColor: "tomato",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
    position: "absolute",
    right: 15,
  },
  scanButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "tomato",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
