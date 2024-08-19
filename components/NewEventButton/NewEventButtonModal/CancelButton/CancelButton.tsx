import {styles} from "./styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {CancelButtonProps} from "./CancelButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {useTranslation} from "react-i18next";

export function CancelButton({closeModal}: CancelButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <TouchableOpacity style={styles(mode).button} onPress={closeModal}>
            <Text style={styles(mode).textStyle}>{t('Cancel')}</Text>
        </TouchableOpacity>
    );
}