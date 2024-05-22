import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            backgroundColor: styleByTime('white', 'black', mode),
            elevation: 2,
        },
        plainText: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: styleByTime('black', 'white', mode)
        },
        mainText: {
            fontSize: 24,
            paddingBottom: 10,
        }
    });
}