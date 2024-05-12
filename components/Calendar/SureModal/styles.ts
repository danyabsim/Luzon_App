import {StyleSheet} from "react-native";
import {styleByTime} from "../../../constants/AppStyles";

export const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: styleByTime('white', '#212121'),
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
        borderColor: styleByTime('#212121', 'white'),
        borderWidth: 1
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        color: styleByTime('black', 'white')
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: styleByTime('#2196F3', '#373737'),
        marginHorizontal: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});