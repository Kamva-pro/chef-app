import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";

const MenuItemDetails: React.FC<{ route: any; navigation: any }> = ({ route }) => {
  const { item } = route.params; 

  const handlePrepareDish = () => {
    Alert.alert("Preparing Dish", `The dish "${item.name}" is being prepared!`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/150" }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Button title="Prepare Dish" onPress={handlePrepareDish} color="#1E90FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E90FF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
});

export default MenuItemDetails;
