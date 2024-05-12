import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {MenuButtonProps} from "./MenuButtonProps";
import styles from './styles';

export default function MenuButton({onPress, source, title}: MenuButtonProps) {
    return (
        <TouchableHighlight
            onPress={onPress}
            style={styles.btnClickContain}
            underlayColor="rgba(128, 128, 128, 0.1)"
        >
            <View style={styles.btnContainer}>
                <Image source={source} style={styles.btnIcon}/>
                <Text style={styles.btnText}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}