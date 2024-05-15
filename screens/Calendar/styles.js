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
        mainText: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 24,
            paddingBottom: 10,
            color: styleByTime('black', 'white', mode)
        }
    });
}