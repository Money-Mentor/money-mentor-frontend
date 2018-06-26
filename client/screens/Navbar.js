import React from "react";
import { Text, View } from "react-native";
// import { Home, Accounts, Budget, Profile } from "../";
import Home from "./Home";
import Budget from "./Budget";
import Accounts from "./Accounts";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const Navbar = () => {
  return <TabNav />;
};

const TabNav = createMaterialBottomTabNavigator(
  {
    Home: { screen: Home },
    Budget: { screen: Budget },
    Accounts: { screen: Accounts }
    // Profile: { screen: Profile },
  },
  {
    initialRouteName: "Home",
    activeTintColor: "#efcdba",
    inactiveTintColor: "#FFFFFF",
    barStyle: { backgroundColor: "#7CA5B8" }
  }
);

export default Navbar;
