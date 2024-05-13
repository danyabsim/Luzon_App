import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
    },
    modalText: {
        width: 120,
        marginRight: 10,
        marginBottom: 15,
        fontSize: 20,
        paddingRight: 10,
        color: styleByTime('black', 'white')
    },
    input: {
        width: 200,
        flex: 1,
        borderBottomWidth: 1,
        color: styleByTime('black', 'white'),
        borderColor: styleByTime('black', 'white'),
        marginRight: 20,
        fontSize: 18,
        paddingHorizontal: 8,
    },
});