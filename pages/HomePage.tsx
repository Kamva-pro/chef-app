import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { FAB, Card, Title, Paragraph } from "react-native-paper";

// Define interface for MenuItem type
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string; // Assuming course is a string
}

const Home: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(route.params?.menu_items || []);

  React.useEffect(() => {
    if (route.params?.menu_items) {
      setMenuItems(route.params.menu_items);
    }
  }, [route.params?.menu_items]);

  // Define the correct type for courseStats
  const courseStats = menuItems.reduce(
    (stats: Record<string, { count: number; totalPrice: number }>, item: MenuItem) => {
      if (!stats[item.course]) {
        stats[item.course] = { count: 0, totalPrice: 0 };
      }
      stats[item.course].count += 1;
      stats[item.course].totalPrice += item.price;
      return stats;
    },
    {} as Record<string, { count: number; totalPrice: number }> // Type assertion here
  );

  return (
    <View style={styles.container}>
      {/* Display menu summary */}
      {menuItems.length > 0 ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Menu Summary:</Text>
          {Object.entries(courseStats).map(([course, { count, totalPrice }]) => (
            <Text key={String(course)} style={styles.summaryText}>
              {String(course)}: {count} dishes | Avg Price: R {(totalPrice / count).toFixed(2)}
            </Text>
          ))}
        </View>
      ) : (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>No menu items available.</Text>
        </View>
      )}

      {/* Display list of menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Title style={styles.title}>{item.name}</Title>
                <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
              </View>
              <Paragraph style={styles.subTitle}>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />

      {/* Add button */}
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add"
        onPress={() => navigation.navigate("Menu", { menu_items: menuItems })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  summaryContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    color: "#555",
  },
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#222",
    fontSize: 20,
    fontWeight: "700",
  },
  subTitle: {
    color: "#444",
    fontSize: 16,
    fontWeight: "400",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#6200ee",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
  },
});

export default Home;
