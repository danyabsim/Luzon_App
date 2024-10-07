import {Text, View} from "react-native";
import {styles} from './styles';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {OptionItems} from "../OptionItems/OptionItems";

export function ChangeLanguageModal({onClose}: { onClose: () => void }) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();
    const [tempLanguage, setTempLanguage] = useState(i18n.language);

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>{t('SettingsCL')}</Text>
            <OptionItems labelList={["English", "עברית"]} valueList={["en", "he"]}
                         value={tempLanguage} changeValue={setTempLanguage}/>
            <View style={styles(mode).inputContainer}>
                <ButtonApp label={t('Save')} onPress={async () => {
                    await i18n.changeLanguage(tempLanguage);
                    await AsyncStorage.setItem('language', JSON.stringify(tempLanguage));
                    onClose();
                }}/>
                <ButtonApp label={t('Cancel')} onPress={onClose}/>
            </View>
        </View>
    );
}