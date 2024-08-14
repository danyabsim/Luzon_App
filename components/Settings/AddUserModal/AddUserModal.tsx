import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHRRequest} from "../../../utils/XHR";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";
import {useTranslation} from "react-i18next";

export function AddUserModal({onClose}: {
    onClose: () => void
}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();

    const {t} = useTranslation();

    const inputContainers = [
        {label: t('Username'), state: username, setState: setUsername},
        {label: t('Password'), state: password, setState: setPassword}
    ];

    function onCloseThisModal() {
        setUsername('');
        setPassword('');
        onClose();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>{t('SettingsAU')}</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={async () => {
                    if (username !== "" && password !== "") {
                        XHRRequest(dispatch, '/addUser', {username: username, password: password, isAdmin: false});
                        await TimeOutDelay(300);
                        XHRRequest(dispatch, '/getAllUserNames', {});
                        onCloseThisModal();
                    } else setErrorModalVisible(true);
                }}>
                    <Text style={styles(mode).textStyle}>{t('Add')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onCloseThisModal}>
                    <Text style={styles(mode).textStyle}>{t('Close')}</Text>
                </TouchableOpacity>
                <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                               errorText={t('IncompleteFields')}/>
            </View>
        </View>
    );
}