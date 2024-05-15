import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: styleByTime('white', 'black', mode),
        },
        itemText: {
            fontSize: 16,
            color: styleByTime('black', 'white', mode),
        },
    });
}