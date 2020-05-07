import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Incidents from "./screens/incidents";
import Details from "./screens/details";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="incidents" component={Incidents} />
        <AppStack.Screen name="details" component={Details} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
