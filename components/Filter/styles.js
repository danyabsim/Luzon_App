import {StyleSheet} from "react-native";
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            alignItems: 'center',
            zIndex: 999,
        },
        elliptical: {
            borderCurve: "circular",
            borderRadius: 10
        },
        menuButton: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 20,
            alignItems: 'center',
        },
        menuText: {
            fontSize: 16,
            color: styleByTime('black', 'white', mode)
        },
        menuContainer: {
            position: 'absolute',
            backgroundColor: styleByTime('white', 'black', mode),
            maxHeight: 200,
            overflow: 'hidden',
        },
        optionList: {
            maxHeight: 150,
        },
        optionListContent: {
            flexGrow: 1,
        },
        optionItem: {
            paddingVertical: 8,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
        }
    });
}