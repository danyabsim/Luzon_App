import {StyleSheet} from "react-native";
import {styleByTime} from "../../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            color: styleByTime('black', 'white', mode)
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });
}