import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {SureModalProps} from "./SureModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";

export function SureModal(props: SureModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <ModalApp modalVisible={props.visible} setModalVisible={props.setVisible} children={
            <View>
                <Text style={styles(mode).modalText}>{t('SureQuestion')}</Text>
                <View style={styles(mode).inputContainer}>
                    <TouchableOpacity style={styles(mode).button} onPress={props.onPressNo}>
                        <Text style={styles(mode).textStyle}>{t('No')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles(mode).button} onPress={props.onPressYes}>
                        <Text style={styles(mode).textStyle}>{t('Yes')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }/>
    );
}