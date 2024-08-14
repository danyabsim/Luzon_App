import {styles} from "./styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {AddButtonProps} from "./AddButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {useTranslation} from "react-i18next";

export function AddButton({onPress}: AddButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <TouchableOpacity style={styles(mode).button} onPress={onPress}>
            <Text style={styles(mode).textStyle}>{t('Add')}</Text>
        </TouchableOpacity>
    );
}