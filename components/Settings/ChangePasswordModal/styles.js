import {StyleSheet} from 'react-native';
import {styleByTime} from "../../../constants/AppStyles";

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
        inputContainer: {
            flexDirection: 'row',
            marginTop: 20,
        },
    });
}