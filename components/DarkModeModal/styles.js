import {StyleSheet} from 'react-native';
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        optionButton: {
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
        },
        optionText: {
            color: styleByTime('white', 'black', mode),
            fontSize: 18,
            fontWeight: 'bold',
        },
    });
}