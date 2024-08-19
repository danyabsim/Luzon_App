import {styles} from "./styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {SaveButtonProps} from "./SaveButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {useTranslation} from "react-i18next";

export function SaveButton({onPress}: SaveButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <TouchableOpacity style={styles(mode).button} onPress={onPress}>
            <Text style={styles(mode).textStyle}>{t('Save')}</Text>
        </TouchableOpacity>
    );
}