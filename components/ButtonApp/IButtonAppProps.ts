import {StyleProp, TextStyle, ViewStyle} from "react-native";
import {MutableRefObject} from "react";

export interface IButtonAppProps {
    onPress: () => void;
    label: string;
    buttonStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    ref?: MutableRefObject<any>;
}