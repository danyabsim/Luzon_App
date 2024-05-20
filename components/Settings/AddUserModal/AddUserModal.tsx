import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHRRequest} from "../../../UserServerIntegration/XHR";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";

export function AddUserModal({onClose}: {
    onClose: () => void
}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const mode = useSelector((state: RootState) => state.darkMode.mode);
    const dispatch = useDispatch();
    const inputContainers = [
        {label: 'Username', state: username, setState: setUsername},
        {label: 'Password', state: password, setState: setPassword}
    ];

    function onCloseThisModal() {
        setUsername('');
        setPassword('');
        onClose();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Add User</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={async () => {
                    if (username !== "" && password !== "") {
                        XHRRequest(dispatch, '/addUser', {username: username, password: password, isAdmin: false});
                        await TimeOutDelay(300);
                        XHRRequest(dispatch, '/getAllUserNames', {});
                    }
                    onCloseThisModal();
                }}>
                    <Text style={styles(mode).textStyle}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onCloseThisModal}>
                    <Text style={styles(mode).textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}