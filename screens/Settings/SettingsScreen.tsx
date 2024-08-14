import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles";
import {ModalApp} from "../../components/ModalApp/ModalApp";
import {
    AddUserModal,
    ChangeLanguageModal,
    ChangePasswordModal,
    ChangeThemeModal,
    RemoveUserModal
} from "../../components/Settings";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";

export default function Settings() {
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();
    const [modalState, setModalState] = useState({visible: false, type: ''});

    const openModal = (type: string) => setModalState({visible: true, type});
    const closeModal = () => setModalState({visible: false, type: ''});

    const ModalContent = {
        'Change Password': ChangePasswordModal,
        'Add User': AddUserModal,
        'Remove User': RemoveUserModal,
        'Dark Mode': ChangeThemeModal,
        'Language': ChangeLanguageModal
    }[modalState.type] || null;

    return (
        <View style={styles(mode).container}>
            {[
                {label: t('SettingsCP'), type: 'Change Password'},
                isAdmin && {label: t('SettingsAU'), type: 'Add User'},
                isAdmin && {label: t('SettingsRU'), type: 'Remove User'},
                {label: t('SettingsCT'), type: 'Dark Mode'},
                {label: t('SettingsCL'), type: 'Language'}
            ].filter(Boolean).map(({label, type}) => (
                <TouchableOpacity key={type} style={styles(mode).settingItem} onPress={() => openModal(type)}>
                    <Text style={styles(mode).settingText}>{label}</Text>
                </TouchableOpacity>
            ))}
            <ModalApp modalVisible={modalState.visible} setModalVisible={closeModal}>
                {ModalContent && <ModalContent onClose={closeModal}/>}
            </ModalApp>
        </View>
    );
}