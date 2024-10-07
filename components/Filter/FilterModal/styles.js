import {StyleSheet} from "react-native";
import {styleByTime} from "../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        elliptical: {
            borderCurve: "circular",
            borderRadius: 10
        },
        container: {
            alignItems: 'center',
        },
        menuContainer: {
            position: 'absolute',
            backgroundColor: styleByTime('white', 'black', mode),
            maxHeight: 200,
            overflow: 'hidden',
        },
    });
}