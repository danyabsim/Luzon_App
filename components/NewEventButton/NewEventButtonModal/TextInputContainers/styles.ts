import {StyleSheet} from "react-native";
import {styleByTime} from "../../../../constants/AppStyles";

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        paddingRight: 10,
        color: styleByTime('black', 'white')
    },
    input: {
        flex: 1,
        color: styleByTime('black', 'white'),
        borderColor: styleByTime('black', 'white'),
        borderBottomWidth: 1,
        marginRight: 20,
        paddingLeft: 4,
    },
});