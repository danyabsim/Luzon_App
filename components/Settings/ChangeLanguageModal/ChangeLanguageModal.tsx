import {Text, TouchableOpacity, View} from "react-native";
import {styles} from './styles';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ChangeLanguageModal({onClose}: {onClose: () => void}) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const { t, i18n } = useTranslation();
    const [tempLanguage, setTempLanguage] = useState(i18n.language);

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>{t('SettingsCL')}</Text>
            {['en', 'he'].map(innerMode => (
                <TouchableOpacity
                    key={innerMode}
                    style={[styles(mode).optionButton, {
                        backgroundColor: innerMode === tempLanguage ? '#007bff' : '#98a2b7',
                    }]}
                    onPress={() => setTempLanguage(innerMode)}
                >
                    <Text
                        style={styles(mode).optionText}>{innerMode == 'en' ? 'English' : 'עברית'}</Text>
                </TouchableOpacity>
            ))}
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={async () => {
                    console.log(tempLanguage);
                    await i18n.changeLanguage(tempLanguage);
                    await AsyncStorage.setItem('language', JSON.stringify(tempLanguage));
                    onClose();
                }}>
                    <Text style={styles(mode).textStyle}>{t('Save')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onClose}>
                    <Text style={styles(mode).textStyle}>{t('Cancel')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}