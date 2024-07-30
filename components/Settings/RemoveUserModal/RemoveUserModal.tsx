import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHRRequest} from "../../../utils/XHR";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";

export function RemoveUserModal({onClose}: {
    onClose: () => void
}) {
    const [username, setUsername] = React.useState('');
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.filter.usernames);
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
                    if (username !== "" && username !== "admin" && usernames.includes(username)) {
                        XHRRequest(dispatch, '/removeUser', {username: username});
                        await TimeOutDelay(300);
                        XHRRequest(dispatch, '/getAllUserNames', {});
                        onCloseThisModal();
                    } else setErrorModalVisible(true);
                }}>
                    <Text style={styles(mode).textStyle}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onCloseThisModal}>
                    <Text style={styles(mode).textStyle}>Close</Text>
                </TouchableOpacity>
                <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                               errorText={`You entered ${username === 'admin' ? '"admin" as it is not possible to remove "admin" at all' : `nothing or a user that does not exist`}. Please fill it out properly.`}/>
            </View>
        </View>
    );
}