import {Platform} from "react-native";

export function styleByTime(lightSetting: any, darkSetting: any, mode: 'dark' | 'light'): any {
    return mode === 'dark' ? darkSetting : lightSetting;
}

export function isPhoneOS() {
    return (Platform.OS === "ios" || Platform.OS === "android");
}