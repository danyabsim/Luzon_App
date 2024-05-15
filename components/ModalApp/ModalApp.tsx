import {Alert, Modal, View} from "react-native";
import React from "react";
import {ModalAppProps} from "./ModalAppProps";
import {styles} from "./styles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export function ModalApp({modalVisible, setModalVisible, children}: ModalAppProps) {
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <Modal
            animationType="slide" transparent={true} visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles(mode).modalView}>
                {children}
            </View>
        </Modal>
    );
}