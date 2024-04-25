import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    mainText: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
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
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        marginRight: 20,
        fontSize: 18,
        paddingHorizontal: 8,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 5,
        marginTop: 10,
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