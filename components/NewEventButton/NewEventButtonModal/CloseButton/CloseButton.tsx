import {styles} from "../../styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {CloseButtonProps} from "./CloseButtonProps";

export function CloseButton({closeModal}: CloseButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={closeModal}>
            <Text style={styles.textStyle}>Close</Text>
        </TouchableOpacity>
    );
}