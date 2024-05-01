import {StyleSheet} from "react-native";

const currentHour = new Date().getHours();

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: (currentHour > 18 && currentHour < 6) ? 'black' : 'white',
        elevation: 2,
    },
    mainText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        paddingTop: 50,
        paddingBottom: 10,
        color: (currentHour > 18 && currentHour < 6) ? 'white' : 'black',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: (currentHour > 18 && currentHour < 6) ? '#212121' : '#2196F3',
        marginHorizontal: 5,
        marginVertical: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});