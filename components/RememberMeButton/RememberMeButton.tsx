import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {RememberMeButtonProps} from "./RememberMeButtonProps";

export function RememberMeButton({rememberMe, onPress}: RememberMeButtonProps) {
    return (
        <View style={styles.inputContainer}>
            <TouchableOpacity style={[styles.rememberMeButton, {backgroundColor: rememberMe ? 'green' : 'red'}]}
                              onPress={onPress}/>
            <Text style={styles.rememberMeButtonText}>{rememberMe ? 'Forget Me' : 'Remember Me'}</Text>
        </View>
    );
}