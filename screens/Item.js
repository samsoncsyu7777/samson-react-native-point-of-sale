import React, { useState, useContext, useEffect } from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import { withTheme, TextInput } from 'react-native-paper';
import Inventory from "./Inventory";

import { UserContext } from "../contexts/UserContext";

function Item(props) {
  const { user, setUser } = useContext(UserContext);
  const [qty, setQty] = useState('');
  const [notNumber, setNotNumber] = useState(false);
  const { itemDTO } = props.route.params;

  const submit = (e) => {
    e.preventDefault();
    if (parseInt(qty)) {
      user.qty = parseInt(qty);
    }else {
      setNotNumber(true);
    }

  };

  return (
    <View style={styles.screen}>
            <ScrollView>

      <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.text}>{itemDTO.description.toUpperCase()}</Text>
        <Image 
        source={{uri: `data:image/gif;base64,${itemDTO.picture}`}} 
        style={{ 
          width: 240, 
          height: 270, 
          marginTop: 30, 
          marginBottom: 30,
          alignSelf: "center"
        }}
        />
        </View>
        <View>
        <Text style={styles.text}>PRICE</Text>
        <TextInput
          mode="outlined"
          disabled
          value={itemDTO.price.toString()}
          style={styles.label}
        />
        {notNumber &&
          <Text style={styles.alert}>QUANTITY must be an integer</Text>}
        <Text style={styles.text}>QUANTITY</Text>
        <TextInput
          mode="outlined"
          value={qty}
          label="QUANTITY"
          style={styles.textInput}
          onChangeText={qty => setQty(qty)}
        />
        <Text style={styles.text}>{itemDTO.featureA.toUpperCase()}</Text>
        <TextInput
          mode="outlined"
          disabled
          value={itemDTO.featureValueA.toString().toUpperCase()}
          style={styles.label}
        />
        <Text style={styles.text}>{itemDTO.featureB.toUpperCase()}</Text>
        <TextInput
          mode="outlined"
          disabled
          value={itemDTO.featureValueB.toString().toUpperCase()}
          style={styles.label}
        />
        <Icon
          name="arrow-right"
          size={Platform.OS === 'web' ? 90 : 60}
          color="#1690aa"
          onPress={submit}
        />
      </View>
      </View>
      </ScrollView>

    </View>
  );

}

export default withTheme(Item);

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ffeef5",
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    width: (Platform.OS === "web") ? "100%" : "70%",
    flex: 1,
    flexDirection: (Platform.OS === "web") ? "row" : "column",
    backgroundColor: "#ffeef5",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: (Platform.OS === "web") ? hp2dp('5%') : 0
  },

  column: {
    marginRight: (Platform.OS === "web") ? wp2dp('10%') : 0
  },

  text: {
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),//14,
    fontWeight: "bold",
    color: theme.colors.primary,
    padding: 0
  },

  alert: {
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),//14,
    fontWeight: "bold",
    color: theme.colors.accent,
    padding: 0
  },

  textInput: {
    width: (Platform.OS === "web") ? 360 : 270,
    height: hp2dp('8%'),//30,
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),//14,
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    padding: 0,
    marginBottom: 20,
    justifyContent: "center"
  },

  label: {
    width: (Platform.OS === "web") ? 360 : 270,
    height: hp2dp('8%'),//30,
    fontSize: (Platform.OS === "web") ? hp2dp('4%') : hp2dp('3%'),//14,
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    padding: 0,
    marginBottom: 20,
    justifyContent: "center"
  },

});
