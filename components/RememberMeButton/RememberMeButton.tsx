import {styles} from "./styles";
import {Pressable, Text, View} from "react-native";
import React from "react";
import {IRememberMeButtonProps} from "./IRememberMeButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";

export function RememberMeButton({rememberMe, onPress}: IRememberMeButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

    const TextualLabel = <Text style={styles(mode).rememberMeButtonText}>{t('RememberMe')}</Text>;

    return (
        <View style={[styles(mode).inputContainer, {alignSelf: i18n.language == 'he' ? "flex-end" : "flex-start"}]}>
            {i18n.language == 'he' && TextualLabel}
            <Pressable style={[styles(mode).rememberMeButton, {backgroundColor: rememberMe ? 'green' : 'red'}]}
                       onPress={onPress}/>
            {i18n.language == 'en' && TextualLabel}
        </View>
    );
}