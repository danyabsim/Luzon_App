import {styleByOS} from "../../constants/AppStyles";
import {Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {TextInputContainersProps} from "./TextInputContainersProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export function TextInputContainers({inputContainers, timeContainers}: TextInputContainersProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    
    return (
        <View>
            {(styleByOS() ? [...inputContainers] : [...inputContainers, ...timeContainers]).map((input, index) => (
                <View key={index} style={styles(mode).inputContainer}>
                    <Text style={styles(mode).modalText}>{input.label}:</Text>
                    <TextInput style={[styles(mode).modalText, styles(mode).input]} onChangeText={input.setState}
                               value={input.state as string}
                               secureTextEntry={input.label.includes('Password')} // Hide password
                    />
                </View>
            ))}
        </View>
    );
}