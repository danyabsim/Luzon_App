import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: styleByTime('white', 'black'),
        paddingTop: 50
    },
    imageHeader: {
        paddingTop: 50,
        width: 100,
        height: 100,
    },
    text: {
        fontSize: 20,
        color: styleByTime( 'black', 'white')
    }
});