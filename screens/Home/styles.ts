import {StyleSheet} from "react-native";

const currentHour = new Date().getHours();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: (currentHour > 18 && currentHour < 6) ? 'black' : 'white',
    },
    mainText: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 20,
        color: (currentHour > 18 && currentHour < 6) ? 'white' : 'black',
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
        color: (currentHour > 18 && currentHour < 6) ? 'white' : 'black',
    },
    input: {
        flex: 1,
        borderBottomWidth: 1,
        color: (currentHour > 18 && currentHour < 6) ? 'white' : 'black',
        borderColor: (currentHour > 18 && currentHour < 6) ? 'white' : 'black',
        marginRight: 20,
        fontSize: 18,
        paddingHorizontal: 8,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: (currentHour > 18 && currentHour < 6) ? '#212121' : '#2196F3',
        marginHorizontal: 5,
        marginTop: 10,
        color: (currentHour > 18 && currentHour < 6) ? 'white' : 'black',
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