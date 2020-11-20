import React, { useState, useContext, useEffect } from "react";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";
import theme from "../Theme";
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  withTheme,
  TextInput,
  ActivityIndicator,
  Badge,
  Button,
  Paragraph,
  Dialog,
  Portal,
  ProgressBar,
  Colors
} from 'react-native-paper';
import Inventory from "./Inventory";
import Dashboard from "./Dashboard";
import axios from 'axios';

import TokenRequestVO from "../models/VOs/TokenRequestVO";
import TokenResponseDTO from "../models/DTOs/TokenResponseDTO";
import LoginVO from "../models/VOs/LoginVO";
import secret from "../Secret";
import { UserContext } from "../contexts/UserContext";

function Login(props) {
  const { user, setUser } = useContext(UserContext);
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = useState('');
  const [visible, setVisible] = useState(false);
  var loginVO = new LoginVO();
  let tokenResponseDTO = new TokenResponseDTO();
  let hiddenPasswordFull = '*******************************';

  useEffect(() => {
    token();
  });

  const submit = (e) => {
    e.preventDefault();
    loginVO.operator = clientId;
    loginVO.passkey = password;
    signIn();

  };

  const hideDialog = () => {
    setVisible(false);
    props.navigation.navigate('Dashboard');
  }

  const token = () => {
    let tokenRequestVO = new TokenRequestVO();
    const PROXY_URL = (Platform.OS === 'web') ? 'https://cors-anywhere.herokuapp.com/' : '';
    const URL = secret.URL + '/api/v1/token';

    axios.post(PROXY_URL + URL, tokenRequestVO)
      .then(response => {
        tokenResponseDTO = response.data;
      })
      .catch(e => console.error("Error occured! ", e));
  }

  const signIn = () => {
    const PROXY_URL = (Platform.OS === 'web') ? 'https://cors-anywhere.herokuapp.com/' : '';
    const URL = secret.URL + '/api/v1/user/access';

    const res = fetch(PROXY_URL + URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + tokenResponseDTO.token
      },
      body: JSON.stringify(loginVO),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if ("token" in responseJson) {
          user.clientId = loginVO.operator;
          user.password = loginVO.passkey;
          user.token = responseJson.token;
          setVisible(true);
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
      <ProgressBar
        progress={0.5}
        color={Colors.red800}
        style={{ height: 10, width: 300, borderRadius: 10 }}
        indeterminate />
      <Text style={styles.text}>CLIENT ID</Text>
      <TextInput
        mode="outlined"
        value={clientId}
        label="CLIENT ID"
        style={styles.textInput}
        onChangeText={clientId => setClientId(clientId)}
      />
      <Badge
        style={styles.badge}
      >
        {clientId.length}
      </Badge>
      <Text style={styles.text}>PASSWORD</Text>
      <TextInput
        mode="outlined"
        label="PASSWORD"
        value={hiddenPassword}
        style={styles.textInput}
        onChangeText={hiddenPassword => {
          var tmp = '';
          if (hiddenPassword.length >= password.length) {
            tmp = password + hiddenPassword[hiddenPassword.length - 1];
          } else {
            tmp = password.slice(0, -1);
          }
          setHiddenPassword(hiddenPasswordFull.substr(0, tmp.length));
          setPassword(tmp);
        }}
      />
      <Badge
        style={styles.badge}
      >
        {password.length}
      </Badge>
      <Icon
        name="arrow-right"
        size={90}
        color="#1690aa"
        onPress={submit}
      />
      <ActivityIndicator
        animating={true}
        color={theme.colors.accent}
        size="large"
      />
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={styles.dialog}
        >
          <Dialog.Title>Welcome</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Correct Client ID and Password</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );

}

export default withTheme(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0ffee",
    alignItems: "center",
    justifyContent: "center"
  },

  text: {
    fontSize: hp2dp('4%'),//28,
    fontWeight: "bold",
    color: theme.colors.primary,
    padding: 10
  },

  textInput: {
    width: 300,
    fontSize: hp2dp('3%'),//18,
    fontWeight: "bold",
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.primary,
    borderRadius: 40,
    borderWidth: 2,
    padding: 10,
    marginBottom: 0
  },

  badge: {
    alignSelf: "center",
    width: hp2dp('4%'),//30,
    height: hp2dp('4%'),//30,
    fontSize: hp2dp('3%'),//20,
    paddingTop: hp2dp('1%'),
    marginLeft: 220
  },

  dialog: {
    textAlign: "center",
    backgroundColor: theme.colors.dialog,
    width: wp2dp('60%'),//300,
    alignSelf: "center"
  },

});
