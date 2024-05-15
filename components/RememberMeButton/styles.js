import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        rememberMeButton: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: styleByTime('#2196F3', '#373737', mode),
            marginRight: 10,
        },
        rememberMeButtonText: {
            fontSize: 18,
            color: styleByTime('black', 'white', mode),
        }
    });
}