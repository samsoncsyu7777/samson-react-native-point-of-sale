import React from "react";
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from "react-native";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Item from "./screens/Item";
import theme from "./Theme";


const RootStack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer >
          <RootStack.Navigator>
            <RootStack.Screen name="Login" component={Login} options={theme.headerStyle}/>
            <RootStack.Screen name="Dashboard" component={Dashboard} options={theme.headerStyle}/>
            <RootStack.Screen name="Item" component={Item} options={theme.headerStyle}/>
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>

    );
  }
}


