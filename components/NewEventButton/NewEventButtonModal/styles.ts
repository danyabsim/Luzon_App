import {Dimensions, StyleSheet} from "react-native";

const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;

export const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        paddingLeft: SCREEN_WIDTH / 4.5,
    },
});