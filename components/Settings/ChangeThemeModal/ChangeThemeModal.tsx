import React, {useState} from 'react';
import {DevSettings, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "../../../redux/Theme/themeSlice";
import {RootState} from "../../../redux/store";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";
import {XHRRequest} from "../../../utils/XHR";
import {setUser} from "../../../redux/User/userSlice";
import {useTranslation} from "react-i18next";

export function ChangeThemeModal({onClose}: {onClose: () => void}) {
    const [mode, setMode] = useState(useSelector((state: RootState) => state.theme.mode));
    const [tempMode, setTempMode] =  useState(mode);
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
        XHRRequest(dispatch, '/logout', {
            username: user.username,
            isRememberMeOn: storedRememberMe ? storedRememberMe : false
        });
        dispatch(setUser({username: '', password: ''}));
        await TimeOutDelay(300);
        DevSettings.reload();
    }

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>{t('SettingsCT')}</Text>
            <Text style={[styles(mode).textStyle, styles(mode).warningTitle]}>{t('ChangeThemeWarning')}</Text>
            {['auto', 'light', 'dark'].map(innerMode => (
                <TouchableOpacity
                    key={innerMode}
                    style={[styles(mode).optionButton, {
                        backgroundColor: innerMode === tempMode ? '#007bff' : '#98a2b7',
                    }]}
                    onPress={() => handleThemeSelection(innerMode as typeof mode)}
                >
                    <Text
                        style={styles(mode).optionText}>{t(innerMode.charAt(0).toUpperCase() + innerMode.slice(1))}</Text>
                </TouchableOpacity>
            ))}
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={handleSaveThemeSelection}>
                    <Text style={styles(mode).textStyle}>{t('Save')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onClose}>
                    <Text style={styles(mode).textStyle}>{t('Cancel')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}