import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    rememberMeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: styleByTime('#2196F3', '#373737'),
        marginRight: 10,
    },
    rememberMeButtonText: {
        fontSize: 18,
        color: styleByTime('black', 'white'),
    }
});