import {StyleSheet} from "react-native";
import {styleByTime} from "../../constants/AppStyles";

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        zIndex: 999,
    },
    menuButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
        color: styleByTime('black','white')
    },
    menuContainer: {
        position: 'absolute',
        backgroundColor: styleByTime('white', 'black'),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        maxHeight: 200,
        overflow: 'hidden',
    },
    optionList: {
        maxHeight: 150,
        padding: 10,
    },
    optionListContent: {
        flexGrow: 1,
    },
    optionItem: {
        paddingVertical: 8,
    }
});