import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleByTime('white', 'black'),
    },
    item: {
        backgroundColor: styleByTime('white', '#212121'),
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        fontSize: 16,
        color: styleByTime('black', 'white'),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 10,
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
        marginHorizontal: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        color: styleByTime('black', 'white')
    }
});