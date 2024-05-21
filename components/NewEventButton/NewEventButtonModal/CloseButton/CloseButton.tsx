import {styles} from "./styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {CloseButtonProps} from "./CloseButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export function CloseButton({closeModal}: CloseButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <TouchableOpacity style={styles(mode).button} onPress={closeModal}>
            <Text style={styles(mode).textStyle}>Close</Text>
        </TouchableOpacity>
    );
}