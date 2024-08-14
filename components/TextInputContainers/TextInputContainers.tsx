import {styleByOS} from "../../constants/AppStyles";
import {Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {TextInputContainersProps} from "./TextInputContainersProps";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";

export function TextInputContainers({inputContainers, timeContainers}: TextInputContainersProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const { t, i18n } = useTranslation();

    const TextualLabel = (input: any) => {return <Text style={styles(mode).modalText}>{input.label}:</Text>};

    return (
        <View>
            {(styleByOS() ? [...inputContainers] : [...inputContainers, ...timeContainers]).map((input, index) => (
                <View key={index} style={styles(mode).inputContainer}>
                    {i18n.language == 'en' && TextualLabel(input)}
                    <TextInput style={[styles(mode).modalText, styles(mode).input]} onChangeText={input.setState}
                               value={input.state as string}
                               secureTextEntry={input.label.includes(t('Password'))} // Hide password
                    />
                    {i18n.language == 'he' && TextualLabel(input)}
                </View>
            ))}
        </View>
    );
}