import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', // Ensure both elements are vertically aligned
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: "flex-end",
        marginHorizontal: 3
    },
    elliptical: {
        borderCurve: "circular",
        borderRadius: 10
    },
    image: {
        width: 24,
        height: 24,
    },
    button: {
        marginHorizontal: 4,
        borderWidth: 1,
        padding: 3,
    }
});