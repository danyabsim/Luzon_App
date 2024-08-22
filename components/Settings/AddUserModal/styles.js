import {StyleSheet} from 'react-native';
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
        inputContainer: {
            flexDirection: 'row',
            marginTop: 20,
        },
    });
}