import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import {MenuButtonProps} from "./MenuButtonProps";
import {styles} from './styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

export default function MenuButton({onPress, source, title}: MenuButtonProps) {
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <TouchableHighlight
            onPress={onPress}
            style={styles(mode).btnClickContain}
            underlayColor="rgba(128, 128, 128, 0.1)"
        >
            <View style={styles(mode).btnContainer}>
                <Image source={source} style={styles(mode).btnIcon}/>
                <Text style={styles(mode).btnText}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}