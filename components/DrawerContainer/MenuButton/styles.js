import { StyleSheet } from 'react-native';
import {styleByTime} from "../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        btnClickContain: {
            flexDirection: 'row',
            padding: 5,
            marginTop: 5,
            marginBottom: 5
        },
        btnContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start'
        },
        btnIcon: {
            height: 25,
            width: 25
        },
        btnText: {
            fontSize: 16,
            marginLeft: 10,
            marginTop: 2,
            color: styleByTime('black', 'white', mode),
        }
    });
}