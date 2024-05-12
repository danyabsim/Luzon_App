import {StyleSheet} from "react-native";
import {styleByTime} from "../../../../constants/AppStyles";

export const styles = StyleSheet.create({
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