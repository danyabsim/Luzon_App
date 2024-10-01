import {StyleSheet} from "react-native";
import {styleByTime} from "../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        modalText: {
            width: 120,
            marginBottom: 15,
            fontSize: 20,
            paddingRight: 5,
            color: styleByTime('black', 'white', mode)
        },
    });
}