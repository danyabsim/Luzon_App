import {styles} from "./styles";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {AddButtonProps} from "./AddButtonProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export function AddButton({onPress}: AddButtonProps) {
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <TouchableOpacity style={styles(mode).button} onPress={onPress}>
            <Text style={styles(mode).textStyle}>Add</Text>
        </TouchableOpacity>
    );
}