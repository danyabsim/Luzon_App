import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {mode, setDarkMode} from '../../constants/AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export function DarkModeModal({navigation}: any) {
    const [theme, setTheme] = React.useState(mode);

    const handleThemeSelection = async (theme: typeof mode) => {
        setDarkMode(theme);
        setTheme(theme);
        await AsyncStorage.setItem('darkMode', JSON.stringify(theme));
        navigation.dispatch(
            CommonActions.reset({
                index: 0, // The screen you want to reset to
                routes: [{ name: 'Settings' }], // Route you want to navigate to
            })
        );
        console.log(`Selected theme: ${theme}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose Theme</Text>
            {['auto', 'light', 'dark'].map(innerMode => (
                <TouchableOpacity
                    key={innerMode}
                    style={[styles.optionButton, {
                        backgroundColor: innerMode === theme ? '#007bff' : '#98a2b7',
                    }]}
                    onPress={() => handleThemeSelection(innerMode as typeof mode)}
                >
                    <Text
                        style={styles.optionText}>Use {innerMode.charAt(0).toUpperCase() + innerMode.slice(1)} Theme</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}