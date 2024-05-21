import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {RememberMeButtonProps} from "./RememberMeButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export function RememberMeButton({rememberMe, onPress}: RememberMeButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <View style={styles(mode).inputContainer}>
            <TouchableOpacity style={[styles(mode).rememberMeButton, {backgroundColor: rememberMe ? 'green' : 'red'}]}
                              onPress={onPress}/>
            <Text style={styles(mode).rememberMeButtonText}>{rememberMe ? 'Forget Me' : 'Remember Me'}</Text>
        </View>
    );
}