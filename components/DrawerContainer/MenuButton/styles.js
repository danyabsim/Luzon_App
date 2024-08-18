import { StyleSheet } from 'react-native';
import {styleByTime} from "../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        btnClickContain: {
            flexDirection: 'row',
            padding: 5,
            marginVertical: 5,
        },
        btnContainer: {
            flex: 1,
            flexDirection: 'row'
        },
        btnIcon: {
            height: 30,
            width: 30
        },
        btnText: {
            fontSize: 18,
            alignSelf: 'center',
            marginHorizontal: 10,
            marginTop: 2,
            color: styleByTime('black', 'white', mode),
        }
    });
}