import {Switch, Text, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {IOptionSwitchProps} from "./IOptionSwitchProps";
import {useTranslation} from "react-i18next";

export function OptionSwitch(props: IOptionSwitchProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {i18n} = useTranslation();

    const toggleSwitch = () => props.setIsEnabled(previousState => !previousState);

    const SwitchLabel = <Text style={styles(mode).modalText}>{props.label}</Text>;
    return (
        <View style={{flexDirection: 'row'}}>
            {i18n.language == 'he' && SwitchLabel}
            <Switch
                trackColor={{false: '#767577', true: '#0034ff'}}
                thumbColor={props.isEnabled ? '#2196F3' : '#f4f4f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={props.isEnabled}
            />
            {i18n.language == 'en' && SwitchLabel}
        </View>
    );
}