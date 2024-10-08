import {StyleSheet} from "react-native";
import {styleByTime} from "../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: styleByTime('black', 'white', mode),
            marginBottom: 20,
        },
    });
}