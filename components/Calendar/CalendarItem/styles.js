import {StyleSheet} from "react-native";
import {styleByTime} from "../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        item: {
            backgroundColor: styleByTime('white', '#212121', mode),
            flex: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            marginTop: 17,
        },
        itemText: {
            fontSize: 16,
            color: styleByTime('black', 'white', mode),
        },
    });
}