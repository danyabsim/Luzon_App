import {StyleSheet} from 'react-native';
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: styleByTime('white', 'black'),
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 20
    }
});