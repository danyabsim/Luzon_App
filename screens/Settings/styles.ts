import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleByTime('white', 'black'),
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    settingItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        paddingVertical: 10,
    },
    settingText: {
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#000',
    },
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: styleByTime('#2196F3', '#373737'),
        marginHorizontal: 5,
        marginVertical: 3
    },
    textStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    }
});