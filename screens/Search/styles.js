import {StyleSheet} from "react-native";
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: styleByTime('white', 'black', mode),
            paddingHorizontal: 20,
            paddingTop: 20,
        },
        modalText: {
            width: 120,
            marginBottom: 15,
            fontSize: 20,
            paddingRight: 10,
            color: styleByTime('black', 'white', mode),
        },
        input: {
            width: 200,
            borderBottomWidth: 1,
            color: styleByTime('black', 'white', mode),
            borderColor: styleByTime('black', 'white', mode),
            paddingHorizontal: 8,
            alignSelf: "center"
        },
        resultItem: {
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderColor: styleByTime('lightgray', 'gray', mode),
            backgroundColor: styleByTime('white', 'black', mode),
        },
        itemText: {
            fontSize: 18,
            color: styleByTime('black', 'white', mode),
        },
    });
}