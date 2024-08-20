
import {StyleSheet} from "react-native";
import {styleByTime} from "../../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        modalText: {
            width: 120,
            marginBottom: 15,
            fontSize: 20,
            paddingRight: 10,
            color: styleByTime('black', 'white', mode)
        },
    });
}