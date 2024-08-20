import {StyleSheet} from "react-native";
import {styleByTime} from "../../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
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
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: styleByTime('black', 'white', mode),
            marginBottom: 20,
            textAlign: 'center',
        },
        container: {
            alignSelf: 'center',
        },
        sectionContainer: {
            flex: 1
        }
    });
}