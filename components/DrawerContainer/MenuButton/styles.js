import { StyleSheet } from 'react-native';
import {styleByTime} from "../../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        btnClickContain: {
            padding: 5,
            marginVertical: 5,
        },
        btnContainer: {
            flexDirection: 'row',
        },
        btnIcon: {
            height: 30,
            width: 30,
            tintColor: styleByTime('black', 'white', mode)
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