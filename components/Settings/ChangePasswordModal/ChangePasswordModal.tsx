import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHRRequest} from "../../../UserServerIntegration/XHR";

export function ChangePasswordModal({onClose}: {
    onClose: () => void
}) {
    const [newPassword, setNewPassword] = React.useState('');
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();
    const inputContainers = [
        {label: 'New Password', state: newPassword, setState: setNewPassword}
    ];

    function onCloseThisModal() {
        setNewPassword('');
        onClose();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Change Password</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={() => {
                    if (newPassword !== "") XHRRequest(dispatch, '/changePassword', {username: user.username, password: user.password, newPassword: newPassword});
                    setNewPassword('');
                    onCloseThisModal();
                }}>
                    <Text style={styles(mode).textStyle}>Change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onCloseThisModal}>
                    <Text style={styles(mode).textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}