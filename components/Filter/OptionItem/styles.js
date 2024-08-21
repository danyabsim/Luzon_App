import {StyleSheet} from "react-native";
import {styleByTime} from "../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        elliptical: {
            borderCurve: "circular",
            borderRadius: 10
        },
        menuText: {
            fontSize: 16,
            color: styleByTime('black', 'white', mode)
        },
        optionItem: {
            paddingVertical: 8,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
        }
    });
}