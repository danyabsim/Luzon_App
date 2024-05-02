import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: styleByTime('white', 'black'),
        elevation: 2,
    },
    mainText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        paddingTop: 50,
        paddingBottom: 10,
        color: styleByTime('black', 'white')
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: styleByTime( '#2196F3', '#212121'),
        marginHorizontal: 5,
        marginVertical: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});