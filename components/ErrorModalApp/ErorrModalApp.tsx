import {ModalApp} from "../ModalApp/ModalApp";
import React from "react";
import {Text, View} from 'react-native';
import {IErrorModalAppProps} from "./IErrorModalAppProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";

export function ErrorModalApp(props: IErrorModalAppProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible} children={
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('Error')}: {props.errorText}</Text>
                <ButtonApp onPress={() => props.setModalVisible(false)} label={t('Close')}/>
            </View>
        }/>
    )
}