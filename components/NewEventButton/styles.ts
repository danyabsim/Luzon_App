import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    inputLabel: {
        width: 80,
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        marginRight: 20,
        paddingLeft: 4,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
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
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        paddingRight: 10
    },
});