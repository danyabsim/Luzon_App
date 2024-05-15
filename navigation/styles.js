import {StyleSheet} from "react-native";
import {styleByTime} from "../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        headerStyle: {
            backgroundColor: styleByTime('white', 'black', mode),
            elevation: 0,
            shadowColor: 'transparent',
            borderBottomWidth: 0,
            marginVertical: 0,
        }
    });
}