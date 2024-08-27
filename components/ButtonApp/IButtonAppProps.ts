import {StyleProp, TextStyle, ViewStyle} from "react-native";

export interface IButtonAppProps {
    onPress: () => void;
    label: string;
    buttonStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
}