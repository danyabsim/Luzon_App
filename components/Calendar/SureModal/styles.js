import {StyleSheet} from "react-native";
import {styleByTime} from "../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
            fontSize: 20,
            color: styleByTime('black', 'white', mode)
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            backgroundColor: styleByTime('#2196F3', '#373737', mode),
            marginHorizontal: 5,
            marginLeft: 15
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    });
}