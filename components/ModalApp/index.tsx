import {Alert, Modal, View} from "react-native";
import React from "react";
import {IModalAppProps} from "./IModalAppProps";
import {styles} from "./styles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";

export function ModalApp({modalVisible, setModalVisible, children, onClose}: IModalAppProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <Modal
            animationType="slide" transparent={true} visible={modalVisible}
            onRequestClose={() => {
                Alert.alert(t('ModalClosed'));
                onClose && onClose();
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles(mode).modalView}>
                {children}
            </View>
        </Modal>
    );
}