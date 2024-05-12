import {StyleSheet} from "react-native";
import {styleByTime} from "../constants/AppStyles";

export const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: styleByTime('white', 'black'),
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        marginVertical: 0,
    }
});