import {Platform} from "react-native";

export let mode: 'dark' | 'light' | 'auto' = 'auto';

export function setDarkMode(newMode: 'dark' | 'light' | 'auto') {
    mode = newMode;
}

export function styleByTime(daySetting: any, nightSetting: any): any {
    if (mode === 'dark') return nightSetting;
    if (mode === 'light') return daySetting;
    const currentHour = new Date().getHours();
    return (currentHour > 18 && currentHour < 6) ? nightSetting : daySetting;
}

export function styleByOS() {
    return (Platform.OS === "ios" || Platform.OS === "android");
}