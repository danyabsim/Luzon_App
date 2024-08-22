import {StyleSheet} from "react-native";
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
        },
        modalText: {
            marginBottom: 15,
            marginHorizontal: 10,
            fontSize: 20,
            color: styleByTime('black', 'white', mode)
        },
        input: {
            width: 125,
            borderBottomWidth: 1,
            color: styleByTime('black', 'white', mode),
            borderColor: styleByTime('black', 'white', mode),
            paddingHorizontal: 8,
        },
    });
}