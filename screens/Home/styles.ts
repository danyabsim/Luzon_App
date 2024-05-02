import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: styleByTime('white', 'black'),
    },
    mainText: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
        color: styleByTime('black', 'white'),
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
        color: styleByTime('black', 'white'),
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        color: styleByTime('black', 'white'),
        borderColor: styleByTime('black', 'white'),
        marginRight: 20,
        fontSize: 18,
        paddingHorizontal: 8,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: styleByTime( '#2196F3', '#212121'),
        marginHorizontal: 5,
        marginTop: 10,
        color: styleByTime('black', 'white'),
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
    },
});