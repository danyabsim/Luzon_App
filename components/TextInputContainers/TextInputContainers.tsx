import {styleByOS} from "../../constants/AppStyles";
import {Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {TextInputContainersProps} from "./TextInputContainersProps";

export function TextInputContainers({inputContainers, timeContainers}: TextInputContainersProps) {
    return (
        <View>
            {(styleByOS() ? [...inputContainers] : [...inputContainers, ...timeContainers]).map((input, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Text style={styles.modalText}>{input.label}:</Text>
                    <TextInput style={[styles.modalText, styles.input]} onChangeText={input.setState}
                               value={input.state as string}
                               secureTextEntry={input.label === 'Password'} // Hide password
                    />
                </View>
            ))}
        </View>
    );
}