import {StyleSheet} from 'react-native';
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        headerButtonContainer: {
            marginTop: 20,
            padding: 8,
            justifyContent: 'center'
        },
        headerButtonImage: {
            justifyContent: 'center',
            width: 25,
            height: 25,
            margin: 6,
            tintColor: styleByTime('black', 'white', mode)
        },
    });
}