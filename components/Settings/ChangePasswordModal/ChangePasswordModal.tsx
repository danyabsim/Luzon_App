import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHRRequest} from "../../../utils/XHR";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";

export function ChangePasswordModal({onClose}: {
    onClose: () => void
}) {
    const [newPassword, setNewPassword] = React.useState('');
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
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
                    if (newPassword !== "") {
                        XHRRequest(dispatch, '/changePassword', {
                            username: user.username,
                            password: user.password,
                            newPassword: newPassword
                        });
                        setNewPassword('');
                        onCloseThisModal();
                    } else setErrorModalVisible(true);
                }}>
                    <Text style={styles(mode).textStyle}>Change</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onCloseThisModal}>
                    <Text style={styles(mode).textStyle}>Close</Text>
                </TouchableOpacity>
                <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                               errorText={"You did not pass a new password. Please fill it out."}/>
            </View>
        </View>
    );
}