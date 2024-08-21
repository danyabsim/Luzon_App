import {Text, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHR} from "../../../utils/XHR";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../ButtonApp/ButtonApp";

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
        <View>
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('SettingsAU')}</Text>
                <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
                <View style={styles(mode).inputContainer}>
                    <ButtonApp label={t('Add')} onPress={async () => {
                        if (username !== "" && password !== "") {
                            XHR(dispatch, '/addUser', {username: username, password: password, isAdmin: false});
                            await TimeOutDelay(300);
                            XHR(dispatch, '/getAllUserNames', {});
                            onCloseThisModal();
                        } else setErrorModalVisible(true);
                    }}/>
                    <ButtonApp label={t('Close')} onPress={onCloseThisModal}/>
                </View>
            </View>
            <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                           errorText={t('IncompleteFields')}/>
        </View>
    );
}