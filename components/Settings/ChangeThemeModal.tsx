import React, {useState} from 'react';
import {DevSettings, Text, View} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "../../redux/Theme/themeSlice";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {OptionItems} from "../OptionItems/OptionItems";

export function ChangeThemeModal({onClose}: { onClose: () => void }) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const [tempMode, setTempMode] = useState(mode);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const handleThemeSelection = async (theme: typeof mode) => {
        setTempMode(theme);
    };

    const handleSaveThemeSelection = async () => {
        dispatch(setDarkMode(tempMode));
        await AsyncStorage.setItem('darkMode', JSON.stringify(tempMode));
        onClose();
        DevSettings.reload();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>{t('SettingsCT')}</Text>
            <Text style={styles(mode).warningTitle}>{t('ChangeThemeWarning')}</Text>
            <OptionItems labelList={[t("Light"), t("Dark")]} valueList={["light", "dark"]} value={tempMode} changeValue={handleThemeSelection}/>
            <View style={styles(mode).inputContainer}>
                <ButtonApp label={t('Save')} onPress={handleSaveThemeSelection}/>
                <ButtonApp label={t('Cancel')} onPress={onClose}/>
            </View>
        </View>
    );
}