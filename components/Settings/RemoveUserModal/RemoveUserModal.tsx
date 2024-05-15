import {Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "../DarkModeModal/styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";

export function RemoveUserModal() {
    const [username, setUsername] = React.useState('');
    const mode = useSelector((state: RootState) => state.darkMode.mode);
    const inputContainers = [
        {label: 'Username', state: username, setState: setUsername},
    ];

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Remove User</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
        </View>
    );
}