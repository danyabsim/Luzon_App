import {Alert, Modal, View} from "react-native";
import React from "react";
import {ModalAppProps} from "./ModalAppProps";
import {styles} from "./styles";

export function ModalApp({modalVisible, setModalVisible, children}: ModalAppProps) {
    return (
        <Modal
            animationType="slide" transparent={true} visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalView}>
                {children}
            </View>
        </Modal>
    );
}