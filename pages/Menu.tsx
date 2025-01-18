import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert} from "react-native";
import { Picker } from '@react-native-picker/picker';


type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: number;
};

const Menu: React.FC = () => {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Appetizer");
  const [price, setPrice] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const handleSave = () => {
    if (!dishName || !description || !price) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const newMenuItem: MenuItem = {
      name: dishName,
      description,
      course: selectedCourse,
      price: parseFloat(price),
    };

    setMenuItems([...menuItems, newMenuItem]);
    Alert.alert("Success", "Menu item added successfully!");

    setDishName("");
    setDescription("");
    setSelectedCourse("Appetizer");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <TextInput
        style={styles.input}
        placeholderTextColor= "#ccc"
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor= "#ccc"

        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Picker
        selectedValue={selectedCourse}
        onValueChange={(itemValue: string) => setSelectedCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main Course" value="Main Course" />
        <Picker.Item label="Side Dish" value="Side Dish" />
        <Picker.Item label="Dessert" value="Dessert" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        placeholderTextColor= "#ccc"

      />

      <View style={styles.buttonContainer}>
        <Button title="Save" color="#000" onPress={handleSave} />
      </View>

      <Text style={styles.subtitle}>Menu Items:</Text>
      {menuItems.map((item, index) => (
        <View key={index} style={styles.menuItem}>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
          <Text>{item.course}</Text>
          <Text>${item.price.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Menu;
