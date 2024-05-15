import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from "react-redux";
import {setDarkMode} from "../../redux/DarkMode/darkModeSlice";
import {RootState} from "../../redux/store";

export function DarkModeModal() {
    const [mode, setMode] = React.useState(useSelector((state: RootState) => state.darkMode.mode));
    const dispatch = useDispatch();

    const handleThemeSelection = async (theme: typeof mode) => {
        dispatch(setDarkMode(theme));
        setMode(theme);
        await AsyncStorage.setItem('darkMode', JSON.stringify(theme));
        console.log(`Selected theme: ${theme}`);
    };

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).title}>Choose Theme</Text>
            {['auto', 'light', 'dark'].map(innerMode => (
                <TouchableOpacity
                    key={innerMode}
                    style={[styles(mode).optionButton, {
                        backgroundColor: innerMode === mode ? '#007bff' : '#98a2b7',
                    }]}
                    onPress={() => handleThemeSelection(innerMode as typeof mode)}
                >
                    <Text
                        style={styles(mode).optionText}>Use {innerMode.charAt(0).toUpperCase() + innerMode.slice(1)} Theme</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}