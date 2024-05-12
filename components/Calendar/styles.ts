import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: styleByTime('white', 'black'),
    },
    itemText: {
        fontSize: 16,
        color: styleByTime('black', 'white'),
    },
});