import React from "react";
import { View, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined; 
  Menu: undefined; 
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FAB
        style={styles.fab}
        icon="plus"
        label="Add"
        onPress={() => navigation.navigate("Menu")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6200ee",
  },
});

export default Home;
