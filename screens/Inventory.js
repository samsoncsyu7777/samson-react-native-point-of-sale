import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import { withTheme, TextInput } from 'react-native-paper';
import Item from "./Item";
import secret from "../Secret";
import { UserContext } from "../contexts/UserContext";

function Inventory(props) {
  const { user, setUser } = useContext(UserContext);
  const [upc , setUpc] = useState('');

  const submit = (e) => {
    e.preventDefault();
    searchUpc();
  };

  const searchUpc = () => {
    const PROXY_URL = (Platform.OS === 'web') ? 'https://cors-anywhere.herokuapp.com/' : '';
    const URL = secret.URL+'/api/v1/item/get-upc/'+upc;  

    const res = fetch(PROXY_URL+URL, {
      method: "get",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": "Bearer " + user.token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if ("content" in responseJson) {
          props.props.navigation.navigate('Item', {itemDTO: responseJson.content[0]});
        } else if ("message" in responseJson) {
          setMessage(responseJson.message);
          setSeverity("error");
        } else if ("errors" in responseJson) {
          setMessage(
            responseJson.errors[0].param + ": " + responseJson.errors[0].msg
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>UPC</Text>
        <TextInput
          mode="outlined"
          value={upc}
          label="UPC"
          style={styles.textInput} 
          onChangeText={upc => setUpc(upc)}
        />

        <Icon 
          name="arrow-right" 
          size={90} 
          color="#1690aa"
          onPress={submit}
        />
      </View>
    );
  
}

export default withTheme(Inventory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffcc",
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: theme.colors.primary,
    padding: 10
  },

  textInput: {
    width: 270,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    borderRadius: 40,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20
  },

});
