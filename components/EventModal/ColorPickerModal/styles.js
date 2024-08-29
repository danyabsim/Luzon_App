import {StyleSheet} from "react-native";
import {styleByTime} from "../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: styleByTime('black', 'white', mode),
            marginBottom: 20,
            textAlign: 'center',
        },
        container: {
            alignSelf: 'center',
        },
        sectionContainer: {
            flex: 1
        }
    });
}