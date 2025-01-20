import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { Card, Title, Paragraph } from "react-native-paper";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  course: string;
}

const Home: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(route.params?.menu_items || []);

  React.useEffect(() => {
    if (route.params?.menu_items) {
      setMenuItems(route.params.menu_items);
    }
  }, [route.params?.menu_items]);

  const courseStats = menuItems.reduce(
    (stats: Record<string, { count: number; totalPrice: number }>, item: MenuItem) => {
      if (!stats[item.course]) {
        stats[item.course] = { count: 0, totalPrice: 0 };
      }
      stats[item.course].count += 1;
      stats[item.course].totalPrice += item.price;
      return stats;
    },
    {} as Record<string, { count: number; totalPrice: number }>
  );

  const actions = [
    {
      text: "Go to Menu",
      // icon: require("./assets/menu-icon.png"), // Replace with your own icon
      name: "menu",
      position: 1,
      onPress: () => navigation.navigate("Menu", { menu_items: menuItems }),
    },
    {
      text: "Go to Filter Menu",
      // icon: require("./assets/filter-icon.png"), // Replace with your own icon
      name: "filterMenu",
      position: 2,
      onPress: () => navigation.navigate("Filter", { menu_items: menuItems }),
    },
  ];

  return (
    <View style={styles.container}>
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

      <FloatingAction
        actions={actions}
        color="#6200ee"
        onPressItem={(name?: string) => {
          if (name) {
            // Find the action based on name and trigger navigation
            const action = actions.find((action) => action.name === name);
            if (action) {
              action.onPress();
            }
          }
        }}
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
});

export default Home;
