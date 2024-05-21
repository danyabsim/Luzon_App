import {ModalApp} from "../ModalApp/ModalApp";
import React from "react";
import {Text, TouchableOpacity, View} from 'react-native';
import {ErrorModalAppProps} from "./ErrorModalAppProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";

export function ErrorModalApp(props: ErrorModalAppProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} children={
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>Error: {props.errorText}</Text>
                <TouchableOpacity style={styles(mode).button} onPress={() => props.setModalVisible(false)}>
                    <Text style={styles(mode).textStyle}>Close</Text>
                </TouchableOpacity>
            </View>
        }/>
    )
}