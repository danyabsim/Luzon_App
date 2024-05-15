import {Text, View} from "react-native";
import {styles} from "../DarkModeModal/styles";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";

export function AddUserModal() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const mode = useSelector((state: RootState) => state.darkMode.mode);
    const inputContainers = [
        {label: 'Username', state: username, setState: setUsername},
        {label: 'Password', state: password, setState: setPassword}
    ];

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Add User</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
        </View>
    );
}