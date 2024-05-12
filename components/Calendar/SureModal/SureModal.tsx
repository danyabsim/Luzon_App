import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {SureModalProps} from "./SureModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";

export function SureModal(props: SureModalProps) {
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <ModalApp modalVisible={modalVisible} setModalVisible={setModalVisible} children={
            <View>
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
        }/>
    );
}