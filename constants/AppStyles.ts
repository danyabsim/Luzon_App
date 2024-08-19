import {Platform} from "react-native";

export function styleByTime(lightSetting: any, darkSetting: any, mode: 'dark' | 'light' | 'auto'): any {
    if (mode === 'dark') return darkSetting;
    if (mode === 'light') return lightSetting;
    const currentHour = new Date().getHours();
    return (currentHour > 18 && currentHour < 6) ? darkSetting : lightSetting;
}

export function styleByOS() {
    return (Platform.OS === "ios" || Platform.OS === "android");
}