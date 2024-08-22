import {StyleSheet} from "react-native";
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
            backgroundColor: styleByTime('white', 'black', mode),
        },
        mainText: {
            textAlign: 'center',
            fontSize: 24,
            marginBottom: 20,
            color: styleByTime('black', 'white', mode),
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        inputLabel: {
            width: 100,
            marginRight: 10,
            fontSize: 18,
            color: styleByTime('black', 'white', mode),
        },
        input: {
            flex: 1,
            borderBottomWidth: 1,
            color: styleByTime('black', 'white', mode),
            borderColor: styleByTime('black', 'white', mode),
            marginRight: 20,
            fontSize: 18,
            paddingHorizontal: 8,
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 18,
        },
        modalText: {
            marginBottom: 15,
            fontSize: 20,
            paddingRight: 10,
        }
    });
}