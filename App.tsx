import Home from "./pages/HomePage";
import Menu from "./pages/Menu";
import FilterMenu from "./pages/FilterMenu";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
                switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Menu":
              iconName = "restaurant-outline";
              break;
            case "Filter":
              iconName = "filter-outline";
              break;
            default:
              iconName = "help-circle-outline";
          }
      
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
      
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Menu" component={Menu} />
        <Tab.Screen name="Filter" component={FilterMenu} initialParams={{ menu_items: [] }}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
