import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";

interface MenuItem {
    id: string;
    name: string;
    description: string;
    course: string;
    price: number;
  }

  const FilterMenu: React.FC<{ route: any }> = ({ route }) => {
    const menuItems: MenuItem[] = route.params?.menu_items || [];
    const [selectedCourse, setSelectedCourse] = useState<string | null>("All");
  
    const filteredItems =
      selectedCourse && selectedCourse !== "All"
        ? menuItems.filter((item) => item.course === selectedCourse)
        : menuItems;
  
    const courses = ["All", "Starter", "Main", "Dessert"];
  
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {courses.map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.button,
                selectedCourse === course && styles.activeButton,
              ]}
              onPress={() => setSelectedCourse(course)}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCourse === course && styles.activeButtonText,
                ]}
              >
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
  
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.description}</Text>
              <Text style={styles.itemText}>R {item.price.toFixed(2)}</Text>
            </View>
          )}
        />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#ddd",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#000",
  },
  buttonText: {
    color: "#333",
    fontSize: 14,
  },
  activeButtonText: {
    color: "#fff",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FilterMenu;
