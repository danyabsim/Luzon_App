import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {SureModalProps} from "./SureModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

export function SureModal(props: SureModalProps) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <ModalApp modalVisible={modalVisible} setModalVisible={setModalVisible} children={
            <View>
                <Text style={styles(mode).modalText}>Are You Sure?</Text>
                <View style={styles(mode).inputContainer}>
                    <TouchableOpacity style={styles(mode).button} onPress={props.onPressNo}>
                        <Text style={styles(mode).textStyle}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles(mode).button} onPress={props.onPressYes}>
                        <Text style={styles(mode).textStyle}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }/>
    );
}