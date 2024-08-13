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

export function ChangeThemeModal({onClose}: {onClose: () => void}) {
    const [mode, setMode] = useState(useSelector((state: RootState) => state.theme.mode));
    const [tempMode, setTempMode] =  useState(mode);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
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
            <Text style={styles(mode).title}>Choose your Theme</Text>
            <Text style={[styles(mode).textStyle, styles(mode).warningTitle]}>Warning: Changing the theme will auto logout from the account!</Text>
            {['auto', 'light', 'dark'].map(innerMode => (
                <TouchableOpacity
                    key={innerMode}
                    style={[styles(mode).optionButton, {
                        backgroundColor: innerMode === tempMode ? '#007bff' : '#98a2b7',
                    }]}
                    onPress={() => handleThemeSelection(innerMode as typeof mode)}
                >
                    <Text
                        style={styles(mode).optionText}>Use {innerMode.charAt(0).toUpperCase() + innerMode.slice(1)} Theme</Text>
                </TouchableOpacity>
            ))}
            <View style={styles(mode).inputContainer}>
                <TouchableOpacity style={styles(mode).button} onPress={handleSaveThemeSelection}>
                    <Text style={styles(mode).textStyle}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(mode).button} onPress={onClose}>
                    <Text style={styles(mode).textStyle}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}