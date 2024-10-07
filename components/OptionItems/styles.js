import {StyleSheet} from "react-native";
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        elliptical: {
            borderCurve: "circular",
            borderRadius: 10
        },
        optionItem: {
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            width: '100%'
        }
    });
}