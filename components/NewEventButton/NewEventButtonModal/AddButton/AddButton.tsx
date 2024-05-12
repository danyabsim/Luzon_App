import {styles} from "../../styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {AddButtonProps} from "./AddButtonProps";

export function AddButton({onPress}: AddButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.textStyle}>Add</Text>
        </TouchableOpacity>
    );
}