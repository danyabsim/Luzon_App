import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {Text, Pressable} from "react-native";
import React from "react";
import {IButtonAppProps} from "./IButtonAppProps";
import {styles} from "./styles";

export function ButtonApp(props: IButtonAppProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <Pressable style={props.buttonStyle || styles(mode).button} onPress={props.onPress}>
            <Text style={props.labelStyle || styles(mode).textStyle}>{props.label}</Text>
        </Pressable>
    );
}