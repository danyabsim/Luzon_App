import {StyleSheet} from "react-native";
import {styleByTime} from "../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        headerStyle: {
            backgroundColor: styleByTime('white', 'black', mode),
            elevation: 0,
            shadowColor: 'transparent',
            borderWidth: 0,
        }
    });
}