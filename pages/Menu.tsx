import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";


const Menu: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const menu_items = route.params?.menu_items || [];

  const handleSave = () => {
    const newItem = {
      id: `${menu_items.length + 1}`,
      name,
      description,
      course,
      price: parseFloat(price),
    };

    // Pass updated menu_items back to the Home screen
    navigation.navigate("Home", { menu_items: [...menu_items, newItem] });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Picker
        selectedValue={course}
        style={styles.input}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Select Course" value="" />
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button title="Save" color="#000" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default Menu;
