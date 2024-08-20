import {Switch, Text, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {IAllDayOptionSwitchProps} from "./IAllDayOptionSwitchProps";
import {useTranslation} from "react-i18next";

export function AllDayOptionSwitch(props: IAllDayOptionSwitchProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

    const toggleSwitch = () => props.setIsEnabled(previousState => !previousState);

    const SwitchLabel = <Text style={styles(mode).modalText}>{t('AllDay')}</Text>;
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