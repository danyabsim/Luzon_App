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

export function ChangePasswordModal({onClose}: { onClose: () => void }) {
    const [newPassword, setNewPassword] = useState('');
    const [passedCheck, setPassedCheck] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const inputContainers = [
        {label: t('NewPassword'), state: newPassword, setState: setNewPassword}
    ];

    function onCloseThisModal() {
        setNewPassword('');
        onClose();
    }

    return (
        <View>
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('SettingsCP')}</Text>
                <TextInputContainers inputContainers={inputContainers}/>
                <PasswordCheck password={newPassword} setPassedCheck={setPassedCheck}/>
                <View style={styles(mode).inputContainer}>
                    <ButtonApp label={t('Change')} onPress={async () => {
                        if (newPassword !== "" && passedCheck) {
                            await XHR(dispatch, '/changePassword', {
                                username: user.username,
                                password: user.password,
                                newPassword: newPassword
                            });
                            setNewPassword('');
                            onCloseThisModal();
                        } else setErrorModalVisible(true);
                    }}/>
                    <ButtonApp label={t('Close')} onPress={onCloseThisModal}/>
                </View>
            </View>
            <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                           errorText={passedCheck ? t('IncompleteFields') : t('PasswordCheckFailed')}/>
        </View>
    );
}