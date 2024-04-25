import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    mainText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        paddingTop: 50,
        paddingBottom: 10
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 5,
        marginVertical: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});