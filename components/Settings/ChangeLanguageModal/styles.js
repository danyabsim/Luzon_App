import {StyleSheet} from 'react-native';
import {styleByTime} from "../../../constants/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
        container: {
            alignItems: 'center',
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: styleByTime('black', 'white', mode),
            marginBottom: 20,
        },
        optionButton: {
            padding: 10,
            borderRadius: 5,
            marginBottom: 10,
            width: '50%'
        },
        optionText: {
            color: styleByTime('white', 'black', mode),
            fontSize: 18,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        button: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            backgroundColor: styleByTime('#2196F3', '#373737', mode),
            marginHorizontal: 10
        },
        textStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
        },
        inputContainer: {
            flexDirection: 'row',
            marginTop: 20,
        },
        warningTitle: {
            marginBottom: 20,
            color: styleByTime('black', 'white', mode),
        }
    });
}