import {Text, View} from "react-native";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {styles} from "./styles";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {XHR} from "../../../utils/XHR";
import {TimeOutDelay} from "../../../utils/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../ButtonApp/ButtonApp";

export function RemoveUserModal({onClose}: {
    onClose: () => void
}) {
    const [username, setUsername] = React.useState('');
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.filter.usernames);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const inputContainers = [
        {label: t('Username'), state: username, setState: setUsername},
    ];

    function onCloseThisModal() {
        setUsername('');
        onClose();
    }

    return (
        <View>
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('SettingsRU')}</Text>
                <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
                <View style={styles(mode).inputContainer}>
                    <ButtonApp label={t('Remove')} onPress={async () => {
                        if (username !== "" && username !== "admin" && usernames.includes(username)) {
                            XHR(dispatch, '/removeUser', {username: username});
                            await TimeOutDelay(300);
                            XHR(dispatch, '/getAllUserNames', {});
                            onCloseThisModal();
                        } else setErrorModalVisible(true);
                    }}/>
                    <ButtonApp label={t('Close')} onPress={onCloseThisModal}/>
                </View>
            </View>
            <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                           errorText={t('RemoveError')}/>
        </View>
    );
}