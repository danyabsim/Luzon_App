import {ModalApp} from "../ModalApp/ModalApp";
import React from "react";
import {Text, TouchableOpacity, View} from 'react-native';
import {ErrorModalAppProps} from "./ErrorModalAppProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";

export function ErrorModalApp(props: ErrorModalAppProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} children={
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('Error')}: {props.errorText}</Text>
                <TouchableOpacity style={styles(mode).button} onPress={() => props.setModalVisible(false)}>
                    <Text style={styles(mode).textStyle}>{t('Close')}</Text>
                </TouchableOpacity>
            </View>
        }/>
    )
}