import React, {useState} from 'react';
import {DevSettings, Text, View} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "../../../redux/Theme/themeSlice";
import {RootState} from "../../../redux/store";
import {XHR} from "../../../utils/XHR";
import {setUser} from "../../../redux/User/userSlice";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../ButtonApp";

export function ChangeThemeModal({onClose}: { onClose: () => void }) {
    const [mode, setMode] = useState(useSelector((state: RootState) => state.theme.mode));
    const [tempMode, setTempMode] = useState(mode);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const {t} = useTranslation();

    const handleThemeSelection = async (theme: typeof mode) => {
        setTempMode(theme);
    };

    const handleSaveThemeSelection = async () => {
        dispatch(setDarkMode(tempMode));
        setMode(tempMode);
        await AsyncStorage.setItem('darkMode', JSON.stringify(tempMode));
        console.log(`Selected theme: ${tempMode}`);
        const storedRememberMe = await AsyncStorage.getItem('rememberMe');
        XHR(dispatch, '/logout', {
            username: user.username,
            isRememberMeOn: storedRememberMe ? storedRememberMe : false
        });
        dispatch(setUser({username: '', password: ''}));
        DevSettings.reload();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>{t('SettingsCT')}</Text>
            <Text style={styles(mode).warningTitle}>{t('ChangeThemeWarning')}</Text>
            {['light', 'dark'].map(innerMode => (
                <ButtonApp label={t(innerMode.charAt(0).toUpperCase() + innerMode.slice(1))} key={innerMode}
                           buttonStyle={[styles(mode).optionButton, {
                               backgroundColor: innerMode === tempMode ? '#007bff' : '#98a2b7',
                           }]} onPress={() => handleThemeSelection(innerMode as typeof mode)}
                />
            ))}
            <View style={styles(mode).inputContainer}>
                <ButtonApp label={t('Save')} onPress={handleSaveThemeSelection}/>
                <ButtonApp label={t('Cancel')} onPress={onClose}/>
            </View>
        </View>
    );
}