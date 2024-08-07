import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
        },
        modalText: {
            width: 120,
            marginBottom: 15,
            fontSize: 20,
            paddingRight: 10,
            color: styleByTime('black', 'white', mode)
        },
        input: {
            width: 200,
            borderBottomWidth: 1,
            color: styleByTime('black', 'white', mode),
            borderColor: styleByTime('black', 'white', mode),
            paddingHorizontal: 8,
        },
    });
}