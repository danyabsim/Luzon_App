import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        modalView: {
            margin: 20,
            backgroundColor: styleByTime('white', '#212121', mode),
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            borderColor: styleByTime('#212121', 'white', mode),
            borderWidth: 1
        },
    });
}