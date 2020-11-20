import React, { useState, useContext, useEffect } from "react";
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
    Button,
    Paragraph,
    Dialog,
    Portal,
} from 'react-native-paper';
import Item from "./Item";
import secret from "../Secret";
import { UserContext } from "../contexts/UserContext";

function ChangePassword(props) {
    const { user, setUser } = useContext(UserContext);
    const [newPassword, setNewPassword] = useState('');
    const [visible, setVisible] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setVisible(true);
        //searchNewPassword();
    };

    const hideDialog = () => {
        setVisible(false);
    }

    const searchNewPassword = () => {
        const PROXY_URL = (Platform.OS === 'web') ? 'https://cors-anywhere.herokuapp.com/' : '';
        const URL = secret.URL + '/api/v1/item/get-upc/' + newPassword;

        const res = fetch(PROXY_URL + URL, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + user.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if ("content" in responseJson) {
                    props.props.navigation.navigate('Item', { itemDTO: responseJson.content[0] });
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
            <Text style={styles.text}>NEW PASSWORD</Text>
            <TextInput
                mode="outlined"
                value={newPassword}
                label="NEW PASSWORD"
                style={styles.textInput}
                onChangeText={newPassword => setNewPassword(newPassword)}
            />

            <Icon
                name="arrow-right"
                size={90}
                color="#1690aa"
                onPress={submit}
            />
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style={styles.dialog}
                >
                    <Dialog.Title>Success</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Password is changed successfully</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );

}

export default withTheme(ChangePassword);

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


    dialog: {
        textAlign: "center",
        backgroundColor: theme.colors.dialog,
        width: 300,
        alignSelf: "center"
    },

});
