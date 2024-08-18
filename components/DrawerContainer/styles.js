import {StyleSheet} from 'react-native';
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        content: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: styleByTime('white', 'black', mode),
        },
        container: {
            flex: 1,
            paddingHorizontal: 20
        }
    });
}