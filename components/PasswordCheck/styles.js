import {StyleSheet} from "react-native";
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        rowContainer: {
            flexDirection: 'row',
            margin: 10,
            marginLeft: 20
        },
        emptyBox: {
            margin: 5,
            marginTop: 3,
            backgroundColor: '#d6d9e0',
            width: 16,
            height: 16,
            borderRadius: 4
        },
        fullBox: {
            margin: 5,
            marginTop: 3,
            backgroundColor: '#7265e3',
            width: 16,
            height: 16,
            borderRadius: 4
        },
        conditionText: {
            color: styleByTime('black', 'white', mode),
            fontSize: 14,
            margin: 5,
            marginTop: 2
        }
    });
}