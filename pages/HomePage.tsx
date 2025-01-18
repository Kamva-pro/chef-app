import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { FAB, Card, Title, Paragraph } from "react-native-paper";

const Home: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [menuItems, setMenuItems] = useState(route.params?.menu_items || []);

  React.useEffect(() => {
    if (route.params?.menu_items) {
      setMenuItems(route.params.menu_items);
    }
  }, [route.params?.menu_items]);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Title>{item.name}</Title>
                <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
              </View>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />

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
