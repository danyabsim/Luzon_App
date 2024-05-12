import {Modal, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {SureModalProps} from "./SureModalProps";

export function SureModal(props: SureModalProps) {
    return (
        <Modal
            animationType="slide" transparent={true} visible={props.visible} onRequestClose={props.onRequestCloseModal}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Are You Sure?</Text>
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.button} onPress={props.onPressNo}>
                        <Text style={styles.textStyle}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={props.onPressYes}>
                        <Text style={styles.textStyle}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}