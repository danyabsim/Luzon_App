import { StyleSheet } from 'react-native';
import {styleByTime} from "../../utils/AppStyles";

export function styles(mode) {
    return StyleSheet.create({
    fab: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        backgroundColor: styleByTime('#2196F3', '#373737', mode),
        fontWeight: 'bold',
        textAlign: 'center',
        zIndex: 100,
    },
    });
}