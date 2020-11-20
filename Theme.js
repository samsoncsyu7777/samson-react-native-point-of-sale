import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 30,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2080aa",
    background: "#ccfeff",
    accent: "#f1c40f",
    dialog: "#f0cde8",
  },
  headerStyle: {
    headerStyle: {backgroundColor: '#ff9977'},
    headerTintColor: '#aa0080',
  }
};

export default theme;
