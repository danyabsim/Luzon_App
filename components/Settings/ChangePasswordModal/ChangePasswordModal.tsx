import {Text, View} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "../DarkModeModal/styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";

export function ChangePasswordModal() {
    const [username, setUsername] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const mode = useSelector((state: RootState) => state.darkMode.mode);
    const inputContainers = [
        {label: 'Username', state: username, setState: setUsername},
        {label: 'Old Password', state: oldPassword, setState: setOldPassword},
        {label: 'New Password', state: newPassword, setState: setNewPassword}
    ];

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Change Password</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
        </View>
    );
}