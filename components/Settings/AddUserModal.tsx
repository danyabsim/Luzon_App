import {Text, View} from "react-native";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../TextInputContainers/TextInputContainers";
import {XHR} from "../../utils/XHR";
import {ErrorModalApp} from "../ErrorModalApp/ErorrModalApp";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {PasswordCheck} from "../PasswordCheck/PasswordCheck";
import {ServerSubURL} from "../../constants/ServerSubURL";

export function AddUserModal({onClose}: { onClose: () => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passedCheck, setPassedCheck] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.events.usernames);
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
                <TextInputContainers inputContainers={inputContainers}/>
                <PasswordCheck password={password} setPassedCheck={setPassedCheck}/>
                <View style={styles(mode).inputContainer}>
                    <ButtonApp label={t('Add')} onPress={async () => {
                        if (username !== "" && password !== "" && !usernames.includes(username) && passedCheck) {
                            await XHR(dispatch, ServerSubURL.AddUser, {username: username, password: password, isAdmin: false});
                            await XHR(dispatch, ServerSubURL.GetAllUserNames, {});
                            onCloseThisModal();
                        } else setErrorModalVisible(true);
                    }}/>
                    <ButtonApp label={t('Close')} onPress={onCloseThisModal}/>
                </View>
            </View>
            <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                           errorText={usernames.includes(username) ? t('UserExists') : (passedCheck ? t('IncompleteFields') : t('PasswordCheckFailed'))}/>
        </View>
    );
}