import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHRRequest} from "../../../UserServerIntegration/XHR";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";

export function RemoveUserModal({onClose}: {
    onClose: () => void
}) {
    const [username, setUsername] = React.useState('');
    const mode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();
    const inputContainers = [
        {label: 'Username', state: username, setState: setUsername},
    ];

    function onCloseThisModal() {
        setUsername('');
        onClose();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Remove User</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={async () => {
                    if (username !== "" && username !== "admin") {
                        XHRRequest(dispatch, '/removeUser', {username: username});
                        await TimeOutDelay(300);
                        XHRRequest(dispatch, '/getAllUserNames', {});
                    }
                    onCloseThisModal();
                }}>
                    <Text style={styles(mode).textStyle}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onCloseThisModal}>
                    <Text style={styles(mode).textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}