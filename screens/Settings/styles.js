import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: styleByTime('white', 'black', mode),
            paddingHorizontal: 20,
            paddingTop: 20,
        },
        settingItem: {
            borderBottomWidth: 1,
            borderBottomColor: styleByTime('black', 'white', mode),
            paddingVertical: 10,
        },
        settingText: {
            fontFamily: 'Roboto',
            fontSize: 16,
            color: styleByTime('black', 'white', mode),
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            backgroundColor: styleByTime('#2196F3', '#373737', mode),
            marginHorizontal: 5,
            marginVertical: 3
        },
        textStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
        }
    });
}