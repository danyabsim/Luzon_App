import {Platform} from "react-native";

export function styleByTime(daySetting: any, nightSetting: any, mode: 'dark' | 'light' | 'auto'): any {
    if (mode === 'dark') return nightSetting;
    if (mode === 'light') return daySetting;
    const currentHour = new Date().getHours();
    return (currentHour > 18 && currentHour < 6) ? nightSetting : daySetting;
}

export function styleByOS() {
    return (Platform.OS === "ios" || Platform.OS === "android");
}